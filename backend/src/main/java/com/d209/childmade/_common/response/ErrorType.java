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
    NOT_FOUND_MEMBER_BY_ROOMID(HttpStatus.UNAUTHORIZED, "해당 방에 참여중인 사용자가 없습니다."),
    NOT_FOUND_MEMBER_BY_MEMBERID(HttpStatus.UNAUTHORIZED, "찾을 수 없는 사용자입니다."),
    CANNOT_SAVE_CUT_VIDEO_IN_LOCAL(HttpStatus.UNAUTHORIZED, "서버에 컷 동영상을 저장할 수 없습니다."),
    CANNOT_CONCAT_CUT_VIDEO(HttpStatus.UNAUTHORIZED, "컷 동영상을 합칠 수 없습니다."),
    CANNOT_DELETE_LOCAL_FILES(HttpStatus.UNAUTHORIZED, "서버에 저장된 컷 동영상들을 삭제할 수 없습니다.")
    ;

    private final HttpStatus status; //http status
    private final String msg; //error message

}
