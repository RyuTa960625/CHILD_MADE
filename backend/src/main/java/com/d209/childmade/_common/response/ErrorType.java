package com.d209.childmade._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorType {

    ALREADY_EXIST_USERID(HttpStatus.UNAUTHORIZED, "이미 존재하는 아이디(이메일)입니다."), //status code 401
    NOT_FOUND_MEMBER(HttpStatus.UNAUTHORIZED, "등록된 사용자 없습니다."),
    ALREADY_EXIST_MEMBER_NICKNAME(HttpStatus.UNAUTHORIZED, "이미 존재하는 닉네임 입니다.")
    ;

    private final HttpStatus status; //http status
    private final String msg; //error message

}
