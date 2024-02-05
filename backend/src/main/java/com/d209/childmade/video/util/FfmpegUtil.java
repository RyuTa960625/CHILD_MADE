package com.d209.childmade.video.util;

import com.d209.childmade._common.S3.S3Util;
import lombok.RequiredArgsConstructor;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import net.bramp.ffmpeg.builder.FFmpegOutputBuilder;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FfmpegUtil {

    private final S3Util s3Util;

    /**
     * 서버 로컬에 저장된 컷 동영상들을 하나의 동영상으로 합하여 S3서버에 저장하는 메서드
     *
     * roomId와 maxScript(대사 개수 = 컷 동영상 개수)를 받고 S3 url을 리턴한다.
     */
    public String mergeVideo(Long roomId, int maxScript){
        // s3에서 파일들을 List<byte[]>로 가져옴
        List<byte[]> data = s3Util.downloadCutVideos(roomId, maxScript);

        // 컷 동영상들을 저장할 경로 설정
        String directory = ".\\cutvideo\\" + Long.toString(roomId);
        File folder = new File(directory);
        folder.mkdirs();

        // 지정 경로에 컷 동영상 저장
        try{
            for(int i = 0; i < maxScript; i++){
                ByteArrayInputStream in = new ByteArrayInputStream(data.get(i));
                FileOutputStream out = new FileOutputStream(new File(directory + "\\" + Integer.toString(i) + ".mp4"));
                IOUtils.copy(in, out);
                IOUtils.closeQuietly(in);
                IOUtils.closeQuietly(out);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 현재 backend 파일의 로컬 절대 위치
        String curDirectory = System.getProperty("user.dir");

        // 컷 동영상들을 하나의 동영상으로 합치기
        try {

            // concat.txt 파일로 합칠 컷 동영상 파일들 목록 저장
            String fileName = directory + "\\concat.txt";
            String input = "";
            String folderroot = System.getProperty("user.dir") + "\\cutvideo\\" + Long.toString(roomId);

            for (int i = 0; i < maxScript; i++) {
                input += "file " + Integer.toString(i) + ".mp4\n";
            }

            File file = new File(fileName);
            FileWriter fw = new FileWriter(file, true);
            fw.write(input);
            fw.flush();
            fw.close();

            // ffmpeg.exe, ffprobe.exe 저장 위치. 컴퓨터에 ffmpeg 설치 후 실제 위치를 넣어줘야함.
            FFmpeg ffmpeg = new FFmpeg("C:\\SSAFY\\ffmpeg\\bin\\ffmpeg.exe");
            FFprobe ffprobe = new FFprobe("C:\\SSAFY\\ffmpeg\\bin\\ffprobe.exe");

            // ffmpeg로 동영상 합치기 설정
            FFmpegOutputBuilder output = new FFmpegOutputBuilder()
                    .setConstantRateFactor(40)
                    .setAudioQuality(6)
                    .addExtraArgs("-threads", String.valueOf((int)Math.floor(Runtime.getRuntime().availableProcessors() * 0.7)))    // cpu 사용 가능 코어의 70%만 사용
                    .addExtraArgs("-vf", "scale=1280:720")  // 영상 사이즈 1280*720
                    .addExtraArgs("-preset", "faster")  // 비트레이트 설정
                    .addExtraArgs("-vsync", "vfr"); // 대용량 파일 작업 시 설정 (1000프레임 이상)

            FFmpegBuilder builder = new FFmpegBuilder()
                    .addExtraArgs("-f", "concat")   //concat 명령어
                    .addExtraArgs("-safe", "0")
                    .addInput(curDirectory + "\\cutvideo\\" + Long.toString(roomId) + "\\concat.txt")   // 합칠 동영상 목록
                    .addOutput(output)
                    .addOutput(curDirectory + "\\cutvideo\\" + Long.toString(roomId) + "\\result.mp4")  // 합친 동영상 저장 위치
                    .setFormat("mp4")   // 저장 파일 파일형 설정
                    .done();

            // ffmpeg 실행
            FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
            executor.createJob(builder).run();

        } catch (Exception e) {
            e.printStackTrace();
        }

        // 저장된 합친 동영상 읽어오기
        File file = new File(curDirectory + "\\cutvideo\\"+ Long.toString(roomId) +"\\result.mp4");
        String fileUrl = s3Util.uploadFile(file, "/", "video", Long.toString(roomId) + ".mp4");

        // 로컬에 저장된 컷 동영상, 합친 동영상, concat.txt 삭제
        File delFolder = new File(curDirectory + "\\cutvideo\\" + roomId);
        try {
            while(delFolder.exists()) {
                File[] folder_list = delFolder.listFiles();
                // 폴더 내 모든 파일 삭제
                for(int i = 0; i < folder_list.length; i++){
                    folder_list[i].delete();
                }

                // 폴더 삭제
                if(folder_list.length == 0 && delFolder.isDirectory()){
                    delFolder.delete();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return fileUrl;
    }
}
