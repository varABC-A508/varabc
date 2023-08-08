package com.varabc.member.mapper;


import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.member.domain.dto.GoogleMemberDto;
import com.varabc.member.domain.dto.KakaoMemberDto;
import com.varabc.member.domain.dto.MemberDto;
import com.varabc.member.domain.entity.Member;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;


@Component
@Mapper
public class MemberMapper {
    public MemberDto memberToDto(Member member){
        return MemberDto.builder()
                .memberNo(member.getMemberNo())
                .memberNickname(member.getMemberNickname())
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberExp(member.getMemberExp())
                .memberAdmin(member.isMemberAdmin())
                .memberImage(member.getMemberImage())
                .memberResign(member.isMemberResign())
                .build();
    }
    public Member memberDtoToEntity(MemberDto memberDto){
        return Member.builder()
                     .memberNickname(memberDto.getMemberNickname())
                     .memberName(memberDto.getMemberName())
                     .memberEmail(memberDto.getMemberEmail())
                     .memberExp(memberDto.getMemberExp())
                     .memberAdmin(memberDto.isMemberAdmin())
                     .memberImage(memberDto.getMemberImage())
                     .memberResign(memberDto.isMemberResign())
                     .build();
    }
    public GoogleMemberDto googleJsonToDto(JsonNode userInfo){
        return GoogleMemberDto.builder()
                .memberEmail(String.valueOf(userInfo.get("email").asText()))
                .memberName(String.valueOf(userInfo.get("name").asText()))
                .memberImage(String.valueOf(userInfo.get("picture").asText()))
                .build();
    }
    public Member googleMemberDtoToEntity(GoogleMemberDto googleMemberDto){
        return Member.builder()
                .memberEmail(googleMemberDto.getMemberEmail())
                .memberName(googleMemberDto.getMemberName())
                .memberImage(googleMemberDto.getMemberImage())
                .build();
    }


    //이거 해야댐
    public KakaoMemberDto kakaoJsonToDto(JsonNode userInfo) {
        return KakaoMemberDto.builder().build();
    }

    public Member kakaoMemberDtoToEntity(KakaoMemberDto kakaoMemberDto) {
        return Member.builder()
                .memberEmail(kakaoMemberDto.getMemberEmail())
                .memberName(kakaoMemberDto.getMemberName())
                .memberImage(kakaoMemberDto.getMemberImage())
                .build();
    }
}
