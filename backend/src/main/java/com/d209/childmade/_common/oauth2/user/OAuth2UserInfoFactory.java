package com.d209.childmade._common.oauth2.user;

import com.d209.childmade._common.oauth2.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

/**
 * OAuth2 인증시 액세스 토큰으로 사용자 정보를 가져왔을 때, OAuth2 제공자 별로 분기하여
 * OAuth2UserInfo 인터페이스 구현체를 호출하여 OAuth2UserInfo 객체를 생성해주는 팩토리 클래스
 */
public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, String accessToken,
                                                   Map<String, Object> attributes) {

        if (ProviderType.GOOGLE.getRegistrationId().equals(registrationId)) {
            return GoogleOAuth2UserInfo.of(accessToken, attributes);
        } else if(ProviderType.KAKAO.getRegistrationId().equals(registrationId)) {
            return KakaoOAuth2UserInfo.of(accessToken, attributes);
        } else  {
            //AuthenticationException은 OAuth2AuthenticationFailureHandler가 잡는다.
            throw new OAuth2AuthenticationProcessingException("Login with " + registrationId + " is not supported");
        }
    }
}
