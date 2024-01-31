package com.d209.childmade.member.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.member.dto.response.MemberInfoResponseDto;
import com.d209.childmade.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{id}")
    public SuccessResponse<MemberInfoResponseDto> memberInfo(@PathVariable(value = "id")Integer memberId) {
        MemberInfoResponseDto memberInfoResponseDto = memberService.memberInfo(memberId);

        return SuccessResponse.of(SuccessType.GET_MEMBER_INFO_SUCCESSFULLY, memberInfoResponseDto);
    }
}
