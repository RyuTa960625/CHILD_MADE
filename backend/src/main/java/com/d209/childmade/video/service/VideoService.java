package com.d209.childmade.video.service;

import com.d209.childmade._common.S3.S3Util;
import com.d209.childmade._common.exception.CustomBadRequestException;
import com.d209.childmade._common.response.ErrorType;
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

    public Page<Video> videoList(Integer memberId, Pageable pageable){
        return videoRepository.findAllByMemberId(memberId, pageable);
    }

    /**
     * Video 테이블에 데이터를 추가하는 메서드
     */
    @Transactional
    public void addVideo(Long roomId, String videoUrl){

        List<Video> videos = new ArrayList<>();

        List<MemberRoom> memberRooms = memberRoomRepository.findAllByRoomId(roomId);
        if(memberRooms.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_MEMBER_BY_ROOMID);
        }

        for(MemberRoom mr : memberRooms) {
            Optional<Member> m = memberRepository.findById(mr.getMember().getId());
            if(m.isEmpty()){
                throw new CustomBadRequestException(ErrorType.NOT_FOUND_MEMBER_BY_MEMBERID);
            }
            Member member = m.get();

            Optional<Room> b = roomRepository.findAllById(roomId);
            if(b.isEmpty()){
                throw new CustomBadRequestException(ErrorType.NOT_FOUND_BOOK);
            }
            String imageUrl = b.get().getBook().getImageUrl();
            String title = b.get().getBook().getTitle();

            String roleName = mr.getRole().getRoleName();

            videos.add(Video.of(videoUrl, imageUrl, title, roleName, member));
        }
        videoRepository.saveAll(videos);
    }

    @Transactional
    public void deleteVideo(Integer memberId, Long videoId){
        videoRepository.deleteByIdAndMemberId(videoId, memberId);
    }

    public byte[] downloadVideo(Long videoId){
        Optional<Video> videos = videoRepository.findById(videoId);
        if(videos.isEmpty()){
            throw new CustomBadRequestException(ErrorType.CANNOT_FIND_VIDEO);
        }
        String videoUrl = videos.get().getVideoUrl();
        String[] tmp = videoUrl.split("/");
        String roomId = tmp[tmp.length - 1];

        return s3Util.downloadVideo("/video", roomId);
    }
}
