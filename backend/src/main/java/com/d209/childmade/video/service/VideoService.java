package com.d209.childmade.video.service;

import com.d209.childmade._common.S3.S3Util;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import com.d209.childmade.room.entity.MemberRoom;
import com.d209.childmade.room.entity.Room;
import com.d209.childmade.room.repository.MemberRoomRepository;
import com.d209.childmade.room.repository.RoomRepository;
import com.d209.childmade.video.entity.Video;
import com.d209.childmade.video.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoService {

    private final S3Util s3Util;
    private final VideoRepository videoRepository;
    private final MemberRoomRepository memberRoomRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    public Page<Video> videoList(int userId, Pageable pageable){
        return videoRepository.findAllByMemberId(userId, pageable);
    }

    public void addVideo(Long roomId, String videoUrl){

        List<Video> videos = new ArrayList<>();

        //책(이미지 url, 제목), 사용자, 역할명
        List<MemberRoom> memberRooms = memberRoomRepository.findAllByRoomId(roomId);
        if(memberRooms.isEmpty()){
            // TODO 방멤버 없음 예외처리
        }

        for(MemberRoom mr : memberRooms) {
            // member
            Optional<Member> m = memberRepository.findById(mr.getMember().getId());
            if(m.isEmpty()){
                // TODO 멤버 없음 예외처리
            }
            Member member = m.get();

            // 책
            Optional<Room> b = roomRepository.findAllById(roomId);
            if(b.isEmpty()){
                // TODO 책 없음 예외처리
            }
            String imageUrl = b.get().getBook().getImageUrl();
            String title = b.get().getBook().getTitle();

            // 역할명
            String roleName = mr.getRole().getRoleName();

            videos.add(Video.of(videoUrl, imageUrl, title, roleName, member));
        }
        videoRepository.saveAll(videos);
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
