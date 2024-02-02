package com.d209.childmade.video.controller;

import com.d209.childmade.video.service.CutVideoService;
import com.d209.childmade.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/videos")
@RequiredArgsConstructor
public class videoController {

    @Autowired
    private CutVideoService cservice;

    @Autowired
    private VideoService service;

    @PostMapping
    public ResponseEntity<String> cutVideoUpload(@RequestParam(value = "file")MultipartFile file,
                                                 @RequestParam(value = "room_id") Long roomId,
                                                 @RequestParam(value = "script_num") Integer scriptNum){
        String str = cservice.cutVideoUpload(file, roomId, scriptNum);

        return new ResponseEntity<String>(str, HttpStatus.OK);
    }

    @GetMapping("/{room-id}/merge")
    public ResponseEntity<String> mergeVideoUpload(@PathVariable(value = "rood-id") Long roomId){
        String str = cservice.mergeVideoUpload(roomId);

        return new ResponseEntity<String>(str, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<String> videoList(@RequestParam(value = "limit") int limit,
                                            @RequestParam(value = "page-num") int pageNum){
        String str = service.videoList(limit, pageNum);

        return new ResponseEntity<String>(str, HttpStatus.OK);
    }

    @DeleteMapping("/{video-id}")
    public ResponseEntity<String> deleteVideo(@PathVariable("video-id") Long videoId){
        String str = service.deleteVideo(videoId);

        return new ResponseEntity<String>(str, HttpStatus.OK);
    }

    @GetMapping("/{video-id}/download")
    public ResponseEntity<String> downloadVideo(@PathVariable("video-id") Long videoId){
        String str = service.downloadVideo(videoId);

        return new ResponseEntity<String>(str, HttpStatus.OK);
    }

}
