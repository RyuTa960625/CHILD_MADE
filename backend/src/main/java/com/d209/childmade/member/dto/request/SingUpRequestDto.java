package com.d209.childmade.member.dto.request;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SingUpRequestDto {

    private final String socialId;
    private final ProviderType providerType;
    private final String email;
    private final String name;
    private final String nickname;
    private final String profile;

    @Builder
    public SingUpRequestDto(String socialId, ProviderType providerType, String email, String name, String nickname, String profile) {
        this.socialId = socialId;
        this.providerType = providerType;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
    }

    public static SingUpRequestDto of(String socialId, ProviderType providerType, String email, String name, String nickname, String profile) {
        return builder()
                .socialId(socialId)
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .profile(profile)
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .socialId(socialId)
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .profile(profile)
                .build();
    }
}
