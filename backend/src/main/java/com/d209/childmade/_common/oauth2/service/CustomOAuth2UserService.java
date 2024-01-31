package com.d209.childmade._common.oauth2.service;

import com.d209.childmade._common.oauth2.exception.OAuth2AuthenticationProcessingException;
import com.d209.childmade._common.oauth2.user.OAuth2UserInfo;
import com.d209.childmade._common.oauth2.user.OAuth2UserInfoFactory;
import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.member.dto.request.SingUpRequestDto;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

/**
 * loadUser 매서드는 스프링 시큐리티 OAuth2LoginAuthenticationFilter에서 시작된 OAuth2 인증 과정중에 호출
 * 호출되는 시점은 액세스 토큰을 OAuth2 제공자로부터 받았을 때
 */
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberService memberService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            //AuthenticationException은 OAuth2AuthenticationFailureHandler가 잡는다.
            System.out.println("loadUser error : " + ex.toString());
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId();
        System.out.println("registrationId : " + registrationId);
        String accessToken = userRequest.getAccessToken().getTokenValue();

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId,
                accessToken,
                oAuth2User.getAttributes());

        //OAuth2UserInfo field 검증
        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            //AuthenticationException은 OAuth2AuthenticationFailureHandler가 잡는다.
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        String email = oAuth2UserInfo.getEmail();
        ProviderType provider = oAuth2UserInfo.getProvider();
        Optional<Member> findMember = memberService.findByEmailAndProviderType(email, provider);

        if (findMember.isEmpty()) {
            //회원이 존재하지 않는 경우
            oAuth2UserInfo.getAttributes().put("exist", false);

            SingUpRequestDto singUpRequestDto = SingUpRequestDto.of(provider, oAuth2UserInfo.getEmail(), oAuth2UserInfo.getName(),
                    oAuth2UserInfo.getEmail(), null, oAuth2UserInfo.getProfileImageUrl());

            Integer memberId = memberService.saveSocialMember(singUpRequestDto);
            oAuth2UserInfo.getAttributes().put("memberId", memberId);
        } else {
            //회원이 존재하는 경우
            oAuth2UserInfo.getAttributes().put("exist", true);
            oAuth2UserInfo.getAttributes().put("memberId", findMember.get().getId());
        }

        return new OAuth2UserPrincipal(oAuth2UserInfo);
    }
}
