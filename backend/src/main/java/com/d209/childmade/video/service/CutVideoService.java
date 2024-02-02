package com.d209.childmade.video.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CutVideoService {

    public String cutVideoUpload(MultipartFile file, Long roomId, Integer scriptNum){

        return "File Uploaded : ";
    }

    public String mergeVideoUpload(Long roomId){

        return "File Uploaded : ";
    }
}
