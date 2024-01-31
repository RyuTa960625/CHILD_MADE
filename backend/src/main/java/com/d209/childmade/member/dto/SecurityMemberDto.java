package com.d209.childmade.member.dto;

import com.d209.childmade._common.oauth2.user.ProviderType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SecurityMemberDto {

    private Integer id;
    private ProviderType providerType;
    private String email;
    private String name;
    private String nickname;
    private String profile;

    @Builder
    private SecurityMemberDto(Integer id, ProviderType providerType, String email, String name, String nickname, String profile) {
        this.id = id;
        this.providerType = providerType;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
    }

    public static SecurityMemberDto of(Integer id, ProviderType providerType, String email, String name, String nickname, String profile) {
        return builder()
                .id(id)
                .providerType(providerType)
                .email(email)
                .name(name)
                .nickname(nickname)
                .profile(profile)
                .build();
    }
}
