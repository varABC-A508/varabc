package com.varabc.member.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.member.domain.dto.GoogleMemberDto;
import com.varabc.member.domain.dto.KakaoMemberDto;
import com.varabc.member.domain.dto.MemberDto;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.mapper.MemberMapper;
import com.varabc.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    @Transactional
    public Member saveGoogleMember(JsonNode userInfo) {
        Member member = memberRepository.findByMemberId(userInfo.get("id").asText());
        if (member == null) {
            GoogleMemberDto googleMemberDto = memberMapper.googleJsonToDto(userInfo);
            member = memberMapper.googleMemberDtoToEntity(googleMemberDto);
            memberRepository.save(member);
            return member;
        }
        updateMemberNameInNewTransaction(userInfo.get("name").asText(), member);
        return member;
    }

    @Override
    public Member saveKakaoMember(JsonNode userInfo) {
        System.out.println(userInfo.get("kakao_account"));
        System.out.println(userInfo.get("kakao_account").get("email"));
        Member member = memberRepository.findByMemberId(userInfo.get("id").asText());

        if (member == null) {
            KakaoMemberDto kakaoMemberDto = memberMapper.kakaoJsonToDto(userInfo);
            member = memberMapper.kakaoMemberDtoToEntity(kakaoMemberDto);
            memberRepository.save(member);
            return member;
        }
        updateMemberNameInNewTransaction(
                userInfo.path("kakao_account").path("profile").path("nickname").asText(), member);
        return member;
    }

    @Override
    public String getEmail(Long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        return member.getMemberEmail();
    }

    @Override
    public List<MemberDto> getMember() {
        List<Member> list = memberRepository.findAll();
        List<MemberDto> memberDtoList = new ArrayList<>();
        for (Member member : list) {
            if (member.isMemberResign()) {
                continue;
            }
            MemberDto memberDto = memberMapper.memberToDto(member);
            memberDtoList.add(memberDto);
        }
        return memberDtoList;
    }

    @Override
    @Transactional
    public boolean deleteMember(long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        member.updateMemberResign(true);
        member.updateMemberIdInvalid();
        return true;
    }

    @Override
    @Transactional
    public void saveRefreshToken(long memberNo, String refreshToken) {
        Member member = memberRepository.findByMemberNo(memberNo);
        member.updateMemberToken(refreshToken);
    }

    @Override
    public MemberDto getMemberByMemberNo(long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        if (member.isMemberResign()) {
            return null;
        }
        return memberMapper.memberToDto(member);
    }

    @Override
    @Transactional
    public void updateMemberNickname(String memberNickname, long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        member.updateMemberNickname(memberNickname);
    }

    @Override
    public boolean findMemberNickname(String memberNickname) {
        Member member = memberRepository.findByMemberNickname(memberNickname);
        if (member != null) {
            return true;
        }
        return false;
    }

    @Transactional
    public void updateMemberNameInNewTransaction(String newName, Member member) {
        member.updateMemberName(newName);
    }
}