package com.d209.childmade.member.dto;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SecurityMemberDto {

    private final Integer id;
    private final String socialId;
    private final ProviderType providerType;
    private final String email;
    private final String name;
    private final String nickname;
    private final String profile;

    @Builder
    private SecurityMemberDto(Integer id, String socialId, ProviderType providerType, String email, String name, String nickname, String profile) {
        this.id = id;
        this.socialId = socialId;
        this.providerType = providerType;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
    }

    public static SecurityMemberDto from(Member member) {
        return builder()
                .id(member.getId())
                .socialId(member.getSocialId())
                .providerType(member.getProviderType())
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .profile(member.getProfile())
                .build();
    }
}
