package com.d209.childmade._common.oauth2.user;

import java.util.Map;

/**
 * OAuth2 제공자 별로 리턴하는 사용자 정보 데이터의 구조와 필드 이름이 다름
 * -> 이를 통합하기 위한 인터페이스
 */
public interface OAuth2UserInfo {

    ProviderType getProvider();

    String getAccessToken();

    Map<String, Object> getAttributes();

    String getId();

    String getEmail();

    String getName();

    String getProfileImageUrl();
}
