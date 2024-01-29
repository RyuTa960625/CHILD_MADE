package com.d209.childmade._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorType {

    ALREADY_EXIST_USERID(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디(이메일)입니다."), //status code 400
    ;

    private final HttpStatus status; //http status
    private final String msg; //error message

}
