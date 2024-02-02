package com.d209.childmade.video.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoService {

    public String videoList(int limit, int pageNum){

        return "Video List : ";
    }

    public String deleteVideo(Long videoId){

        return "Delete Video : ";
    }

    public String downloadVideo(Long videoId){

        return "Download Video : ";
    }
}
