package com.d209.childmade._common.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ErrorResponse {

    private final int statusCode; //http status code
    private final String statusName; //http status name
    private final String msg; //error message

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

    public static ErrorResponse of(HttpStatus status, String msg) {
        return ErrorResponse.builder()
                .statusCode(status.value())
                .statusName(status.name())
                .msg(msg)
                .build();
    }
}
