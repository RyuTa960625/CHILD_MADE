package com.d209.childmade.member.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.member.dto.response.MemberInfoResponseDto;
import com.d209.childmade.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{id}")
    public SuccessResponse<MemberInfoResponseDto> findMemberById(@PathVariable(value = "id")Integer memberId) {
        MemberInfoResponseDto memberInfoResponseDto = memberService.findMemberById(memberId);

        return SuccessResponse.of(SuccessType.GET_MEMBER_INFO_SUCCESSFULLY, memberInfoResponseDto);
    }

    @PutMapping("/name/{id}")
    public SuccessResponse<Void> updateMemberName(@PathVariable(value = "id")Integer memberId, String name) {
        memberService.updateMemberName(memberId, name);

        return SuccessResponse.from(SuccessType.UPDATE_MEMBER_NAME_SUCCESSFULLY);
    }

    @PutMapping("/email/{id}")
    public SuccessResponse<Void> updateMemberEmail(@PathVariable(value = "id")Integer memberId, String email) {
        memberService.updateMemberEmail(memberId, email);

        return SuccessResponse.from(SuccessType.UPDATE_MEMBER_EMAIL_SUCCESSFULLY);
    }

    @PutMapping("/nickname/{id}")
    public SuccessResponse<Void> updateMemberNickname(@PathVariable(value = "id")Integer memberId, String nickname) {
        memberService.updateMemberNickname(memberId, nickname);

        return SuccessResponse.from(SuccessType.UPDATE_MEMBER_NICKNAME_SUCCESSFULLY);
    }
}
