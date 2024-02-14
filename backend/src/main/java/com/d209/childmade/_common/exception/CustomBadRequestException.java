package com.d209.childmade._common.exception;

import com.d209.childmade._common.response.ErrorType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CustomBadRequestException extends RuntimeException {

    private final ErrorType errorType;

}
