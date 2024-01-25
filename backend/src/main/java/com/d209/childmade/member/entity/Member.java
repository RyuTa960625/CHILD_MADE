package com.d209.childmade.member.entity;

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

    @Column(nullable = false, length = 20)
    private String email;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column
    private String profile;

    @Builder
    private Member(String email, String name, String nickname, String password, String profile) {
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.profile = profile;
    }

    public static Member of(String email, String name, String nickname, String encodePw, String profile) {
        return builder()
                .email(email)
                .name(name)
                .nickname(nickname)
                .password(encodePw)
                .profile(profile)
                .build();
    }
}
