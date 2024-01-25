package com.d209.childmade.video.entity;

import com.d209.childmade._common.entity.BaseTime;
import com.d209.childmade.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Video extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_id")
    private Long id;

    private String videoUrl;

    private String imageUrl;

    private String videoTitle;

    private String roleName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Builder
    private Video(String videoUrl, String imageUrl, String videoTitle, String roleName, Member member) {
        this.videoUrl = videoUrl;
        this.imageUrl = imageUrl;
        this.videoTitle = videoTitle;
        this.roleName = roleName;
        this.member = member;
    }

    public static Video of(String videoUrl, String imageUrl, String videoTitle, String roleName, Member member) {
        return builder()
                .videoUrl(videoUrl)
                .imageUrl(imageUrl)
                .videoTitle(videoTitle)
                .roleName(roleName)
                .member(member)
                .build();
    }
}
