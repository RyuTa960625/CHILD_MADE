package com.d209.childmade.Auth.controller;

import com.d209.childmade.Auth.service.AuthTokenService;
import com.d209.childmade._common.response.SuccessType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthTokenService authTokenService;

    @PostMapping("/logout")
    public ResponseEntity<SuccessType> logout(@RequestHeader(value = "Authorization") final String accessToken) {
        System.out.println("access token : " + accessToken);
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        authTokenService.removeRefreshToken(accessToken);

        return ResponseEntity.ok(SuccessType.LOGOUT_SUCCESSFULLY);
    }

    @PostMapping("/regenerate-token")
    public ResponseEntity<String> regenerateToken(@RequestHeader("Authorization") final String accessToken) {

        String newAccessToken = authTokenService.republishAccessToken(accessToken);
        if (StringUtils.hasText(newAccessToken)) {
            return ResponseEntity.ok(newAccessToken);
        }

        return ResponseEntity.badRequest().body("access token을 만들지 못했습니다.");
    }
}
