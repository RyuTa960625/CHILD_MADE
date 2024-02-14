package com.d209.childmade._common.util;

import com.d209.childmade.member.dto.SecurityMemberDto;
import org.springframework.security.core.context.SecurityContextHolder;

/*
*  Security Context의 인증 객체로부터 다양한 정보를 뽑아서 제공하는 클래스
* */
public abstract class SecurityUtils {

    public static String getUserId() {
        return ((SecurityMemberDto)(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getEmail();
    }

    public static SecurityMemberDto getUser() {
        return (SecurityMemberDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
