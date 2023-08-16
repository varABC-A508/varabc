package com.varabc.member.repository;


import com.varabc.member.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberNo(Long memberNo);
    Member findByMemberEmail(String memberEmail);
    Member findByMemberId(String memberId);
    Member findByMemberNickname(String memberNickname);
}
