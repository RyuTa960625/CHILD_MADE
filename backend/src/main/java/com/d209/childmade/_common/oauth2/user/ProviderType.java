package com.d209.childmade._common.oauth2.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProviderType {

    GOOGLE("google"),
    KAKAO("kakao"),
    ;

    private final String registrationId;
}
