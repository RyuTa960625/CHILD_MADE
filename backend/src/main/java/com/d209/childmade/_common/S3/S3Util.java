package com.d209.childmade._common.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public class S3Util {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;  // S3 Bucket name

    @Autowired
    private AmazonS3 amazonS3;

    /**
     컷 동영상을 방 id(roodId)와 대사 순서(fileName)를 통해
     S3상의 'bucketName/cutvideo/roodId/' 경로에 fileName으로 저장하는 메서드
     */
    public String uploadCutVideo(MultipartFile file, String roomId, String fileName){
        createFolder(bucketName + "/cutvideo", roomId);
        ObjectMetadata objectMetadata = getObjectMetadata(file);
        try {
            amazonS3.putObject(new PutObjectRequest(bucketName + "/cutvideo/" + roomId, fileName, file.getInputStream(), objectMetadata));
        } catch (IOException e) {
//            log.error("Error uploading file to S3", e);
        }
        return amazonS3.getUrl(bucketName + "/cutvideo/" + roomId, fileName).toString();
    }

    /**
     * S3상에 새로운 폴더를 생성하는 메서드
     * S3상의 dirName 경로에 folderName으로 폴더를 생성한다.
     */
    public void createFolder(String dirName, String folderName){
        amazonS3.putObject(dirName, folderName + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
    }

    /**
        file의 파일 타입과 크기를 저장한 ObjectMetadata을 반환하는 메서드
     */
    public ObjectMetadata getObjectMetadata(MultipartFile file){
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());
        return objectMetadata;
    }
}
