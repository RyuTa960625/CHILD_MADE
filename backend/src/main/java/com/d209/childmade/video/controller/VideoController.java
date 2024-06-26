package com.d209.childmade.video.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.video.dto.request.CutVideoRequestDto;
import com.d209.childmade.video.entity.Video;
import com.d209.childmade.video.service.CutVideoService;
import com.d209.childmade.video.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final CutVideoService cservice;

    private final VideoService service;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public SuccessResponse<Void> cutVideoUpload(@RequestPart(value = "file") MultipartFile file,
                                                  @RequestPart(value = "info") CutVideoRequestDto info){
        cservice.cutVideoUpload(file, info);

        return SuccessResponse.from(SuccessType.UPLOAD_CUT_VIDEO_SUCCESSFULLY);
    }

    @GetMapping("/{room-id}/{max-script}/merge")
    public SuccessResponse<Void> mergeVideoUpload(@PathVariable(value = "room-id") Long roomId,
                                                   @PathVariable(value = "max-script") int maxScript){
        String videoUrl = cservice.mergeVideoUpload(roomId, maxScript);
        service.addVideo(roomId, videoUrl);

        return SuccessResponse.from(SuccessType.UPLOAD_MERGE_VIDEO_SUCCESSFULLY);
    }

    @GetMapping("/{member-id}")
    public SuccessResponse<Page<Video>> videoList(@PathVariable(value = "member-id") Integer memberId,
                                                 @RequestParam(value = "keyword") String keyword,
                                                 Pageable pageable){
        return SuccessResponse.of(SuccessType.VIDEO_LIST_SUCCESSFULLY, service.videoList(memberId, keyword, pageable));
    }

    @DeleteMapping("/{member-id}/{video-id}")
    public SuccessResponse<Void> deleteVideo(@PathVariable("member-id") Integer memberId,
                                              @PathVariable("video-id") Long videoId){
        service.deleteVideo(memberId, videoId);

        return SuccessResponse.from(SuccessType.DELETE_VIDEO_SUCCESSFULLY);
    }

    @GetMapping("/{video-id}/download")
    public ResponseEntity<ByteArrayResource> downloadVideo(@PathVariable("video-id") Long videoId){
        byte[] data = service.downloadVideo(videoId);
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok().contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + LocalDateTime.now() + ".mp4\"")
                .body(resource);
    }
}
