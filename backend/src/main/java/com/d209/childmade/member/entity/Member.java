package com.d209.childmade.member.entity;

import com.d209.childmade._common.oauth2.user.ProviderType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer id;

    @Column
    private String socialId;

    @Enumerated(EnumType.STRING)
    @Column
    private ProviderType providerType; //로그인 형태

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;

    private String profile; //프로필 사진 url

    @Builder
    public Member(String socialId, ProviderType providerType, String email, String name, String nickname, String profile) {
        this.socialId = socialId;
        this.providerType = providerType;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
    }

    public static Member of(String socialId, ProviderType providerType, String email, String name, String nickname, String profile) {
        return builder()
                .socialId(socialId)
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .profile(profile)
                .build();
    }

    public void updateProfileImage(String imgUrl) {
        this.profile = imgUrl;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }
}
