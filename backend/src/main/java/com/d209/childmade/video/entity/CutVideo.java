package com.d209.childmade.video.entity;

import com.d209.childmade.room.entity.Room;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CutVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cut_video_id")
    private Long id;

    @Column(nullable = false)
    private int videoNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Builder
    private CutVideo(int videoNum, Room room) {

        this.videoNum = videoNum;
        this.room = room;
    }

    public static CutVideo of(int videoNum, Room room) {
        return builder()
                .videoNum(videoNum)
                .room(room)
                .build();
    }
}
