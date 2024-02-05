package com.d209.childmade.video.controller;

import com.d209.childmade.video.dto.request.CutVideoRequestDto;
import com.d209.childmade.video.entity.Video;
import com.d209.childmade.video.service.CutVideoService;
import com.d209.childmade.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final CutVideoService cservice;

    private final VideoService service;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> cutVideoUpload(@RequestPart(value = "file") MultipartFile file,
                                                 @RequestPart(value = "info") CutVideoRequestDto info){
        cservice.cutVideoUpload(file, info);

        return new ResponseEntity<String>(info.toString(), HttpStatus.OK);   //TODO: response 수정 예정
    }

    @GetMapping("/{room-id}/{max-script}/merge")
    public ResponseEntity<String> mergeVideoUpload(@PathVariable(value = "room-id") Long roomId,
                                                   @PathVariable(value = "max-script") int maxScript){
        String videoUrl = cservice.mergeVideoUpload(roomId, maxScript);
        service.addVideo(roomId, videoUrl);

        return new ResponseEntity<String>(videoUrl, HttpStatus.OK);   //TODO: response 수정 예정
    }

    @GetMapping("/{user-id}")
    public ResponseEntity<Page<Video>> videoList(@PathVariable(value = "user-id") int userId,
                                                 Pageable pageable){
        Page<Video> videos= service.videoList(userId, pageable);

        return new ResponseEntity<Page<Video>>(videos, HttpStatus.OK);   //TODO: response 수정 예정
    }

    @DeleteMapping("/{user-id}/{video-id}")
    public ResponseEntity<String> deleteVideo(@PathVariable("user-id") int userId,
                                              @PathVariable("video-id") Long videoId){
        service.deleteVideo(userId, videoId);

        return new ResponseEntity<String>("good", HttpStatus.OK);   //TODO: response 수정 예정
    }

    @GetMapping("/{video-id}/download")
    public ResponseEntity<ByteArrayResource> downloadVideo(@PathVariable("video-id") Long videoId){
        ByteArrayResource video = new ByteArrayResource(service.downloadVideo(videoId));

        return new ResponseEntity<ByteArrayResource>(video, HttpStatus.OK);   //TODO: response 수정 예정
    }

}
