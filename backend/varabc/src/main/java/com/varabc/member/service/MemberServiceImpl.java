package com.varabc.member.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.member.domain.dto.GoogleMemberDto;
import com.varabc.member.domain.dto.KakaoMemberDto;
import com.varabc.member.domain.dto.MemberDto;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.mapper.MemberMapper;
import com.varabc.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    @Transactional
    public Member saveGoogleMember(JsonNode userInfo) {
        Member member = memberRepository.findByMemberEmail(userInfo.get("email").asText());
        if(member==null){
            GoogleMemberDto googleMemberDto =memberMapper.googleJsonToDto(userInfo);
            member = memberMapper.googleMemberDtoToEntity(googleMemberDto);
            memberRepository.save(member);
            return member;
        }
        updateMemberNameInNewTransaction(userInfo.get("name").asText(),member);
        return member;
    }

    @Override
    public Member saveKakaoMember(JsonNode userInfo) {
        Member member = memberRepository.findByMemberEmail(userInfo.get("email").asText());
        System.out.println(member);
        System.out.println(userInfo);
        if(member==null){
            KakaoMemberDto kakaoMemberDto =memberMapper.kakaoJsonToDto(userInfo);
            member = memberMapper.kakaoMemberDtoToEntity(kakaoMemberDto);
            memberRepository.save(member);
            return member;
        }
        updateMemberNameInNewTransaction(userInfo.get("name").asText(),member);
        return member;
    }

    @Override
    public String getEmail(Long memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo);
        return member.getMemberEmail();
    }

    @Override
    @Transactional
    public void saveRefreshToken(long memberNo, String refreshToken) {
        Member member = memberRepository.findByMemberNo(memberNo);
        member.updateMemberToken(refreshToken);
    }

    @Override
    public MemberDto getMemberByMemberNo(long memberNo) {
        Member member= memberRepository.findByMemberNo(memberNo);
        MemberDto memberDto=memberMapper.memberToDto(member);
        return memberDto;
    }

    @Override
    @Transactional
    public void updateMemberNickname(String memberNickname, long memberNo) {
        Member member=memberRepository.findByMemberNo(memberNo);
        member.updateMemberNickname(memberNickname);
    }

    @Override
    public boolean findMemberNickname(String memberNickname) {
        Member member = memberRepository.findByMemberNickname(memberNickname);
        if (member!=null){
            return true;
        }
        return false;
    }

    @Transactional
    public void updateMemberNameInNewTransaction(String newName, Member member) {
        member.updateMemberName(newName);
    }
}
