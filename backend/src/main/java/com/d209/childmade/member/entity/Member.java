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
    private ProviderType providerType; //로그인 형태

    @Column(nullable = false, length = 20)
    private String email;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column
    private String profile; //프로필 사진 url

    @Builder
    private Member(ProviderType providerType, String email, String name, String nickname, String password, String profile) {
        this.providerType = providerType;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.profile = profile;
    }

    public static Member of(ProviderType providerType, String email, String name, String nickname, String encodePw, String profile) {
        return builder()
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .password(encodePw)
                .profile(profile)
                .build();
    }
}
