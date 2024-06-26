package com.d209.childmade._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessType {

    SIGNUP_SUCCESSFULLY(HttpStatus.OK, "회원 가입 성공"), //status code 200
    LOGIN_SUCCESSFULLY(HttpStatus.OK,"로그인 성공"),
    GET_MEMBER_INFO_SUCCESSFULLY(HttpStatus.OK, "사용자 정보 조회 성공"),
    LOGOUT_SUCCESSFULLY(HttpStatus.OK, "로그아웃 성공"),
    UPDATE_MEMBER_NAME_SUCCESSFULLY(HttpStatus.OK, "사용자 이름 수정 성공"),
    UPDATE_MEMBER_EMAIL_SUCCESSFULLY(HttpStatus.OK, "사용자 이메일 수정 성공"),
    UPDATE_MEMBER_NICKNAME_SUCCESSFULLY(HttpStatus.OK, "사용자 닉네임 수정 성공"),
    UPDATE_MEMBER_PROFILE_SUCCESSFULLY(HttpStatus.OK, "사용자 프로필 수정 성공"),
    ROOM_JOIN_SUCCESSFULLY(HttpStatus.OK,"방 배정 성공"),
    BOOK_LIST_SUCCESSFULLY(HttpStatus.OK,"동화책 리스트 조회 성공"),
    SCRIPT_LIST_SUCCESSFULLY(HttpStatus.OK,"대사 리스트 조회 성공"),
    ROLE_LIST_SUCCESSFULLY(HttpStatus.OK,"역할 리스트 조회 성공"),
    UPDATE_ROOM_START_SUCCESSFULLY(HttpStatus.OK,"방 시작 성공"),
    UPDATE_ROOM_FINISH_SUCCESSFULLY(HttpStatus.OK,"방 종료 성공"),
    ROOM_LEAVE_SUCCESSFULLY(HttpStatus.OK,"방 떠나기 성공"),
    UPLOAD_CUT_VIDEO_SUCCESSFULLY(HttpStatus.OK, "컷 동영상 업로드 성공"),
    UPLOAD_MERGE_VIDEO_SUCCESSFULLY(HttpStatus.OK, "동영상 합치기 및 업로드 성공"),
    VIDEO_LIST_SUCCESSFULLY(HttpStatus.OK, "동영상 리스트 조회 성공"),
    DELETE_VIDEO_SUCCESSFULLY(HttpStatus.OK, "동영상 삭제 성공"),
    DOWNLOAD_VIDEO_SUCCESSFULLY(HttpStatus.OK, "동영상 다운로드 성공"),


    ;

    private final HttpStatus status; //http status
    private final String msg; //success message

}
