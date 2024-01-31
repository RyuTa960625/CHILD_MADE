package com.d209.childmade._common.oauth2.handler;

import com.d209.childmade.Auth.service.AuthTokenService;
import com.d209.childmade._common.jwt.GeneratedToken;
import com.d209.childmade._common.jwt.JwtUtil;
import com.d209.childmade._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.d209.childmade._common.oauth2.service.OAuth2UserPrincipal;
import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade._common.oauth2.user.OAuth2UserUnlinkManager;
import com.d209.childmade._common.util.CookieUtils;
import com.d209.childmade.member.dto.request.SingUpRequestDto;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

import static com.d209.childmade._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static com.d209.childmade._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * OAuth2 인증 성공시 호출되는 핸들러
 * 프론트앤트에서 백엔드 로그인 요청시 mode 쿼리 파라미터에 담긴 값에 따라 분기하여 처리
 * mode=login -> 사용자 정보 DB 저장, 서비스 액세스 토큰, 리프레시 토큰 생성, 리프레시 토큰 DB 저장
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2UserUnlinkManager oAuth2UserUnlinkManager;
    private final AuthTokenService authTokenService;
    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String targetUrl;

        targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {

            logger.debug("Response has already been cimmitted. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);

    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse("");

        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if(principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("error", "Login failed")
                    .build().toUriString();
        }

        if ("login".equalsIgnoreCase(mode)) {
            log.info("id={}, email={}, name={}, profileUrl={}, accessToken={}, providerType={}",
                    principal.getUserInfo().getId(),
                    principal.getUserInfo().getEmail(),
                    principal.getUserInfo().getName(),
                    principal.getUserInfo().getProfileImageUrl(),
                    principal.getUserInfo().getAccessToken(),
                    principal.getUserInfo().getProvider()
            );

            String socialId = principal.getUserInfo().getId();
            Optional<Member> findMember = memberService.findBySocialId(socialId);

            //로그인한 회원 존재 여부
            if (findMember.isEmpty()) {
                //회원이 존재하지 않는 경우
                SingUpRequestDto singUpRequestDto = SingUpRequestDto.of(principal.getUserInfo().getId(), principal.getUserInfo().getProvider(), principal.getUserInfo().getEmail(),
                        principal.getUserInfo().getName(), principal.getUserInfo().getProvider().ordinal() + principal.getUserInfo().getName().substring(0, 1) + principal.getUserInfo().getId(), principal.getUserInfo().getProfileImageUrl());

                Integer memberId = memberService.saveSocialMember(singUpRequestDto);
                GeneratedToken token = jwtUtil.generateToken(memberId.toString());

                //TODO: 회원가입 페이지(닉네임)로 리다이렉트
                return UriComponentsBuilder.fromUriString(targetUrl)
                        .queryParam("access-token", token.getAccessToken())
                        .build().toUriString();

            } else {
                //회원이 존재하는 경우
                GeneratedToken token = jwtUtil.generateToken(findMember.get().getId().toString());

                //TODO: 로그인 후 페이지로 리다이렉트
                return UriComponentsBuilder.fromUriString(targetUrl)
                        .queryParam("access-token", token.getAccessToken())
                        .build().toUriString();
            }

        } else if ("unlink".equalsIgnoreCase(mode)) {

            String accessToken = principal.getUserInfo().getAccessToken();
            ProviderType provider = principal.getUserInfo().getProvider();
            oAuth2UserUnlinkManager.unlink(provider, accessToken);
            Optional<Member> findMember = memberService.findBySocialId(principal.getUserInfo().getId());
            authTokenService.removeRefreshTokenById(findMember.get().getId().toString());
            memberService.deleteMember(findMember);

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();
        }

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", "Login failed")
                .build().toUriString();

    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {

        Object principal = authentication.getPrincipal();

        if(principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }

        return null;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {

        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}
