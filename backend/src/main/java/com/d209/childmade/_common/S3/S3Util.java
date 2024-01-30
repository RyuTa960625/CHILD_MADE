package com.d209.childmade._common.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class S3Util {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;  // S3 Bucket name

    @Autowired
    private AmazonS3 amazonS3;

    /**
     * 컷 동영상을 방 id(roodId)와 대사 순서(scriptNum)를 통해
     * S3상의 'bucketName/cutvideo/roodId/' 경로에 scriptNum으로 저장하는 메서드
     */
    public void uploadCutVideo(MultipartFile file, Long roomId, int scriptNum){
        createFolder(bucketName + "/cutvideo", Long.toString(roomId));
        ObjectMetadata objectMetadata = getObjectMetadata(file);
        try {
            amazonS3.putObject(new PutObjectRequest(bucketName + "/cutvideo/" + Long.toString(roomId), Integer.toString(scriptNum), file.getInputStream(), objectMetadata));
        } catch (IOException e) {
//            log.error("Error uploading file to S3", e);
        }
    }

    /**
     * roomId에 해당하는 방에서 녹화된 모든 컷 동영상들을
     * S3에서 다운로드 받아 byte[]형태로 리스트에 저장해 반환한다.
     */
    public List<byte[]> downloadCutVideos(Long roodId, int scriptCount){
        List<byte[]> cutVideos = new ArrayList<>();
        for(int i = 1; i <= scriptCount; i++){
            S3Object s3Object = amazonS3.getObject(bucketName + "/cutvideo/" + Long.toString(roodId), Integer.toString(scriptCount) + ".mp4");
            S3ObjectInputStream inputStream = s3Object.getObjectContent();
            try {
                cutVideos.add(IOUtils.toByteArray(inputStream));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return cutVideos;
    }

    /**
     * 파일 업로드 공통 메서드
     *
     * file: 업로드할 파일
     * directory: 파일을 업로드할 경로에서 마지막 폴더 이름을 뺀 값. /로 시작하고 /로 끝난다.
     * lastFolder: 파일을 업로드할 경로의 마지막 폴더 이름
     * fileName: 파일을 저장할 이름
     *
     * S3 파일 열람 url을 반환한다.
     */
    public String upload(MultipartFile file, String directory, String lastFolder, String fileName){
        createFolder(bucketName + directory, lastFolder);
        ObjectMetadata objectMetadata = getObjectMetadata(file);
        try {
            amazonS3.putObject(new PutObjectRequest(bucketName + directory + lastFolder, fileName, file.getInputStream(), objectMetadata));
        }catch (IOException e){
//            log.error("Error uploading file to S3", e);
            return null;
        }
        return amazonS3.getUrl(bucketName + directory + lastFolder, fileName).toString();
    }

    /**
     * 파일 다운로드 공통 메서드
     *
     * directory: 다운로드 받을 파일의 경로. /로 시작한다.
     * fileName: 다운로드 받을 파일의 이름
     *
     * 파일을 byte[] 형태로 반환한다.
     */
    public byte[] downloadVideo(String directory, String fileName){
        S3Object s3Object = amazonS3.getObject(bucketName + directory, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * S3상에 새로운 폴더를 생성하는 메서드
     * S3상의 dirName 경로에 folderName으로 폴더를 생성한다.
     */
    public void createFolder(String dirName, String folderName){
        amazonS3.putObject(dirName, folderName + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
    }

    /**
     * file의 파일 타입과 크기를 저장한 ObjectMetadata을 반환하는 메서드
     */
    public ObjectMetadata getObjectMetadata(MultipartFile file){
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());
        return objectMetadata;
    }
}
