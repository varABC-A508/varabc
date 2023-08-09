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
import org.springframework.transaction.annotation.Propagation;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    @Transactional
    public Member saveGoogleMember(JsonNode userInfo) {
        Member member = memberRepository.findByMemberEmail(userInfo.get("email").asText());
//        System.out.println(member);
//        System.out.println(userInfo);
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
    @Transactional
    public void saveRefreshToken(long memberNo, String refreshToken) {
        Member member = memberRepository.findByMemberNo(memberNo);
        System.out.println("saveRefreshToken 1 member : " + member.toString());
        member.updateMemberToken(refreshToken);
        System.out.println("saveRefreshToken 2 member : " + member.toString());
    }

    @Transactional
    public void updateMemberNameInNewTransaction(String newName, Member member) {
        System.out.println("method call");
        member.updateMemberName(newName);
    }
}
