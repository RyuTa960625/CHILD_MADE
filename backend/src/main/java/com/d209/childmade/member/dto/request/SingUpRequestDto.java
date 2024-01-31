package com.d209.childmade.member.dto.request;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SingUpRequestDto {

    private ProviderType providerType;
    private String email;
    private String name;
    private String nickname;
    private String password;
    private String profile;

    @Builder
    private SingUpRequestDto(ProviderType providerType, String email, String name, String nickname, String password, String profile) {
        this.providerType = providerType;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.profile = profile;
    }

    public static SingUpRequestDto of(ProviderType providerType, String email, String name, String nickname, String password, String profile) {
        return builder()
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .password(password)
                .profile(profile)
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .password(password)
                .profile(profile)
                .build();
    }
}
