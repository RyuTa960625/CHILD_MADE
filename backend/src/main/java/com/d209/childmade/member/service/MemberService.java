package com.d209.childmade.member.service;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.member.dto.request.SingUpRequestDto;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.security.Provider;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Optional<Member> findByEmailAndProviderType(String email, ProviderType providerType) {
        return memberRepository.findByEmailAndProviderType(email, providerType);
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
