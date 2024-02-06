package com.d209.childmade._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorType {

    ALREADY_EXIST_USERID(HttpStatus.UNAUTHORIZED, "이미 존재하는 아이디(이메일)입니다."), //status code 401
    NOT_FOUND_MEMBER(HttpStatus.UNAUTHORIZED, "등록된 사용자 없습니다."),
    ALREADY_EXIST_MEMBER_NICKNAME(HttpStatus.UNAUTHORIZED, "이미 존재하는 닉네임 입니다."),
    NOT_FOUND_ROLE(HttpStatus.UNAUTHORIZED, "등록된 역할이 없습니다."),
    NOT_FOUND_BOOK(HttpStatus.UNAUTHORIZED, "등록된 동화가 없습니다."),
    NOT_FOUND_ROOM(HttpStatus.UNAUTHORIZED, "요청한 방이 없습니다."),
    NOT_FOUND_MEMBER_ROOM(HttpStatus.UNAUTHORIZED, "참여 중인 방이 없습니다."),
    NOT_FOUND_BOOK_LIST(HttpStatus.UNAUTHORIZED, "조회된 동화책이 없습니다."),
    NOT_FOUND_SCRIPT_LIST(HttpStatus.UNAUTHORIZED, "조회된 대사가 없습니다."),
    NOT_ALLOWED_ROOM_START(HttpStatus.UNAUTHORIZED, "방이 이미 종료되어 시작할 수 없습니다."),
    ;

    private final HttpStatus status; //http status
    private final String msg; //error message
}
