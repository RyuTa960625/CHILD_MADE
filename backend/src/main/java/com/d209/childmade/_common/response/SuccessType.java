package com.d209.childmade._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessType {

    SIGNUP_SUCCESSFULLY(HttpStatus.OK, "회원 가입 성공"), //status code 200
    LOGIN_SUCCESSFULLY(HttpStatus.OK,"로그인 성공"),
    GET_MEMBER_INFO_SUCCESSFULLY(HttpStatus.OK, "회원 정보 조회 성공"),
    ROOM_JOIN_SUCCESSFULLY(HttpStatus.OK,"방 배정 성공"),
    LOGOUT_SUCCESSFULLY(HttpStatus.OK, "로그아웃 성공"),
    ;

    private final HttpStatus status; //http status
    private final String msg; //success message

}
