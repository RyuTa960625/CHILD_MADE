package com.d209.childmade.video.controller;

import com.d209.childmade.video.dto.request.CutVideoRequestDto;
import com.d209.childmade.video.service.CutVideoService;
import com.d209.childmade.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
        String str = cservice.mergeVideoUpload(roomId, maxScript);

        return new ResponseEntity<String>(str, HttpStatus.OK);   //TODO: response 수정 예정
    }

    @GetMapping
    public ResponseEntity<String> videoList(@RequestParam(value = "limit") int limit,
                                            @RequestParam(value = "page-num") int pageNum){
        String str = service.videoList(limit, pageNum);

        return new ResponseEntity<String>(str, HttpStatus.OK);   //TODO: response 수정 예정
    }

    @DeleteMapping("/{video-id}")
    public ResponseEntity<String> deleteVideo(@PathVariable("video-id") Long videoId){
        String str = service.deleteVideo(videoId);

        return new ResponseEntity<String>(str, HttpStatus.OK);   //TODO: response 수정 예정
    }

    @GetMapping("/{video-id}/download")
    public ResponseEntity<String> downloadVideo(@PathVariable("video-id") Long videoId){
        String str = service.downloadVideo(videoId);

        return new ResponseEntity<String>(str, HttpStatus.OK);   //TODO: response 수정 예정
    }

}
