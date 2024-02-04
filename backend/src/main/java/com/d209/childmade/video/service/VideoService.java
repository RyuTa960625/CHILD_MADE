package com.d209.childmade.video.service;

import com.d209.childmade._common.S3.S3Util;
import com.d209.childmade.video.entity.Video;
import com.d209.childmade.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoService {

    private final S3Util s3Util;
    private final VideoRepository videoRepository;

    public Page<Video> videoList(int userId, Pageable pageable){
        return videoRepository.findAllByMemberId(userId, pageable);
    }

    public void deleteVideo(int userId, Long videoId){
        videoRepository.deleteByIdAndMemberId(videoId, userId);
    }

    public byte[] downloadVideo(Long videoId){
        String videoUrl = videoRepository.findVideoUrlById(videoId);
        String[] tmp = videoUrl.split("/");
        String roomId = tmp[tmp.length - 1];

        return s3Util.downloadVideo("/video", roomId);
    }
}
