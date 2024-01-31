package com.d209.childmade.member.repository;

import com.d209.childmade._common.oauth2.user.ProviderType;
import com.d209.childmade.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findBySocialId(String socialId);

    Optional<Member> findByNickname(String nickname);
}
