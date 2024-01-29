package com.d209.childmade._common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse <T> {

    private int statusCode; //http status code
    private String msg; //response message
    private T data; //response data

    @Builder
    private SuccessResponse(int statusCode, String msg, T data) {
        this.statusCode = statusCode;
        this.msg = msg;
        this.data = data;
    }

    public static <T> SuccessResponse<T> of(SuccessType successType, T data) {
        return SuccessResponse.<T>builder()
                .statusCode(successType.getStatus().value())
                .msg(successType.getMsg())
                .data(data)
                .build();
    }
}
