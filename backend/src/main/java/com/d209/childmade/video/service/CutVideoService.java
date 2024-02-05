package com.d209.childmade.video.service;


import com.d209.childmade._common.S3.S3Util;
import com.d209.childmade.video.dto.request.CutVideoRequestDto;
import com.d209.childmade.video.util.FfmpegUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CutVideoService {

    private final S3Util s3Util;
    private final FfmpegUtil ffmpegUtil;

    public void cutVideoUpload(MultipartFile file, CutVideoRequestDto info){
        s3Util.uploadCutVideo(file, info.getRoomId(), info.getScriptNum());
    }

    public String mergeVideoUpload(Long roomId, int maxScript){
        return ffmpegUtil.mergeVideo(roomId, maxScript);
    }
}
