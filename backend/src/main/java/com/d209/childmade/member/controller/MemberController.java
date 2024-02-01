package com.d209.childmade.member.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.member.dto.request.UpdateEmailRequestDto;
import com.d209.childmade.member.dto.request.UpdateNameRequestDto;
import com.d209.childmade.member.dto.request.UpdateNicknameRequestDto;
import com.d209.childmade.member.dto.response.MemberInfoResponseDto;
import com.d209.childmade.member.dto.response.UpdateProfileResponseDto;
import com.d209.childmade.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{id}")
    public SuccessResponse<MemberInfoResponseDto> getMember(@PathVariable(value = "id")Integer memberId) {
        return SuccessResponse.of(SuccessType.GET_MEMBER_INFO_SUCCESSFULLY, memberService.getMember(memberId));
    }

    @PutMapping("/{id}/name")
    public SuccessResponse<Void> updateMemberName(@PathVariable(value = "id")Integer memberId, @RequestBody UpdateNameRequestDto updateNameRequestDto) {
        memberService.updateMemberName(memberId, updateNameRequestDto);

        return SuccessResponse.from(SuccessType.UPDATE_MEMBER_NAME_SUCCESSFULLY);
    }

    @PutMapping("/{id}/email")
    public SuccessResponse<Void> updateMemberEmail(@PathVariable(value = "id")Integer memberId, @RequestBody UpdateEmailRequestDto updateEmailRequestDto) {
        memberService.updateMemberEmail(memberId, updateEmailRequestDto);

        return SuccessResponse.from(SuccessType.UPDATE_MEMBER_EMAIL_SUCCESSFULLY);
    }

    @PutMapping("/{id}/nickname")
    public SuccessResponse<Void> updateMemberNickname(@PathVariable(value = "id")Integer memberId, @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
        memberService.updateMemberNickname(memberId, updateNicknameRequestDto);

        return SuccessResponse.from(SuccessType.UPDATE_MEMBER_NICKNAME_SUCCESSFULLY);
    }

    @PutMapping("/{id}/profile")
    public SuccessResponse<UpdateProfileResponseDto> updateMemberProfile(@PathVariable(value = "id")Integer memberId, MultipartFile file) {
        UpdateProfileResponseDto updateProfileResponseDto = memberService.updateMemberProfile(memberId, file);

        return SuccessResponse.of(SuccessType.UPDATE_MEMBER_PROFILE_SUCCESSFULLY, updateProfileResponseDto);
    }
}
