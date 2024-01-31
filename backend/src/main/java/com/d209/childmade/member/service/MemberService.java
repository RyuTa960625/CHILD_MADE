package com.d209.childmade.member.service;

import com.d209.childmade._common.exception.CustomBadRequestException;
import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade._common.response.ErrorType;
import com.d209.childmade.member.dto.request.SingUpRequestDto;
import com.d209.childmade.member.dto.response.MemberInfoResponseDto;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.security.Provider;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Optional<Member> findBySocialId(String socialId) {
        return memberRepository.findBySocialId(socialId);
    }

    public Optional<Member> findById(Integer memberId) {
        return memberRepository.findById(memberId);
    }

    public MemberInfoResponseDto memberInfo(Integer memberId) {

        Optional<Member> findMember = memberRepository.findById(memberId);

        if (findMember.isEmpty()) {
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_MEMBER);
        }

        return MemberInfoResponseDto.of(findMember.get().getId(), findMember.get().getProviderType(),
                findMember.get().getEmail(), findMember.get().getName(), findMember.get().getNickname(),
                findMember.get().getProfile());
    }

    @Transactional
    public Integer saveSocialMember(SingUpRequestDto singUpRequestDto) {

        Member member = singUpRequestDto.toEntity();

        //프로필이 없으면 기본 이미지 넣기
        if(!StringUtils.hasText(singUpRequestDto.getProfile())) {
            member.updateProfileImage("pj1.s3.ap-northeast-2.amazonaws.com/profile.png");
        }

        return memberRepository.save(member).getId();
    }
}
