package com.d209.childmade._common.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ErrorResponse {

    private int statusCode; //http status code
    private String statusName; //http status name
    private String msg; //error message

    @Builder
    private ErrorResponse(int statusCode, String statusName, String msg) {
        this.statusCode = statusCode;
        this.statusName = statusName;
        this.msg = msg;
    }

    public static ErrorResponse from(ErrorType errorType) {
        return ErrorResponse.builder()
                .statusCode(errorType.getStatus().value())
                .statusName(errorType.getStatus().name())
                .msg(errorType.getMsg())
                .build();
    }

    public static ErrorResponse of(int statusCode, String statusName, String msg) {
        return ErrorResponse.builder()
                .statusCode(statusCode)
                .statusName(statusName)
                .msg(msg)
                .build();
    }
}
