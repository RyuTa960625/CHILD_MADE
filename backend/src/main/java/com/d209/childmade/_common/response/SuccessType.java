package com.d209.childmade._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessType {

    SIGNUP_SUCCESSFULLY(HttpStatus.OK, "회원 가입 성공"), //status code 200
    LOGIN_SUCCESSFULLY(HttpStatus.OK,"로그인 성공"),
    ;

    private final HttpStatus status; //http status
    private final String msg; //success message

}
