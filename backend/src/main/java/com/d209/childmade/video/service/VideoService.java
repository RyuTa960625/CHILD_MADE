package com.d209.childmade.video.service;

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

    private final VideoRepository videoRepository;

    public Page<Video> videoList(int userId, Pageable pageable){
        return videoRepository.findAllByUserId(userId, pageable);
    }

    public String deleteVideo(Long videoId){

        return "Delete Video : ";
    }

    public String downloadVideo(Long videoId){

        return "Download Video : ";
    }
}
