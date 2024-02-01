package com.d209.childmade.member.service;

import com.d209.childmade._common.S3.S3Util;
import com.d209.childmade._common.exception.CustomBadRequestException;
import com.d209.childmade._common.response.ErrorType;
import com.d209.childmade.member.dto.SecurityMemberDto;
import com.d209.childmade.member.dto.request.SingUpRequestDto;
import com.d209.childmade.member.dto.request.UpdateEmailRequestDto;
import com.d209.childmade.member.dto.request.UpdateNameRequestDto;
import com.d209.childmade.member.dto.request.UpdateNicknameRequestDto;
import com.d209.childmade.member.dto.response.MemberInfoResponseDto;
import com.d209.childmade.member.dto.response.UpdateProfileResponseDto;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final S3Util s3Util;

    public Optional<Member> findBySocialId(String socialId) {
        return memberRepository.findBySocialId(socialId);
    }

    public SecurityMemberDto getSecurityMember(Integer memberId) {
        Member member = findById(memberId)
                .orElseThrow(IllegalStateException::new);
        
        return SecurityMemberDto.from(member);
    }
    
    public MemberInfoResponseDto getMember(Integer memberId) {

        return MemberInfoResponseDto.from(findMember(memberId));
    }

    @Transactional
    public Integer saveSocialMember(SingUpRequestDto singUpRequestDto) {

        Member member = Member.from(singUpRequestDto);

        //프로필이 없으면 기본 이미지 넣기
        if(!StringUtils.hasText(singUpRequestDto.getProfile())) {
            member.updateProfileImage("pj1.s3.ap-northeast-2.amazonaws.com/profile.png");
        }

        return memberRepository.save(member).getId();
    }

    @Transactional
    public void updateMemberName(Integer memberId, UpdateNameRequestDto updateNameRequestDto) {
        Member member = findMember(memberId);
        member.updateName(updateNameRequestDto.getName());
    }

    @Transactional
    public void updateMemberEmail(Integer memberId, UpdateEmailRequestDto updateEmailRequestDto) {
        Member member = findMember(memberId);
        member.updateEmail(updateEmailRequestDto.getEmail());
    }

    @Transactional
    public void updateMemberNickname(Integer memberId, UpdateNicknameRequestDto updateNicknameRequestDto) {
        Member member = findMember(memberId);

        String nickname = updateNicknameRequestDto.getNickname();
        validateDuplicatedNickname(nickname);

        member.updateNickname(nickname);
    }

    @Transactional
    public UpdateProfileResponseDto updateMemberProfile(Integer memberId, MultipartFile file) {
        String profile = s3Util.upload(file, "/user/", "profile", memberId.toString());
        Optional<Member> member = memberRepository.findById(memberId);
        if(member.isEmpty())
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_MEMBER);

        member.get().updateProfileImage(profile);

        return new UpdateProfileResponseDto(profile);
    }

    @Transactional
    public void deleteMember(Optional<Member> member) {
        if(member.isEmpty())
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_MEMBER);

        memberRepository.delete(member.get());
    }

    private Optional<Member> findById(Integer memberId) {
        return memberRepository.findById(memberId);
    }

    private Member findMember(Integer memberId) {
        return findById(memberId)
                .orElseThrow(() -> new CustomBadRequestException(ErrorType.NOT_FOUND_MEMBER));
    }

    private void validateDuplicatedNickname(String nickname) {
        if (!memberRepository.existsByNickname(nickname)) {
            throw new CustomBadRequestException(ErrorType.ALREADY_EXIST_MEMBER_NICKNAME);
        }
    }
}
