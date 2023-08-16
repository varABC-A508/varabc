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
                .memberId(member.getMemberId())
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
                     .memberId(memberDto.getMemberId())
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
        String memberEmail = userInfo.has("email") ? String.valueOf(userInfo.get("email").asText()) : null;
        String memberName = userInfo.has("name") ? String.valueOf(userInfo.get("name").asText()) : null;
        String memberImage = userInfo.has("picture") ? String.valueOf(userInfo.get("picture").asText()) : null;
        String memberId = userInfo.has("id") ? String.valueOf(userInfo.get("id").asText()) : null;

        return GoogleMemberDto.builder()
                .memberId(memberId)
                .memberEmail(memberEmail)
                .memberName(memberName)
                .memberImage(memberImage)
                .build();
    }
    public Member googleMemberDtoToEntity(GoogleMemberDto googleMemberDto){
        return Member.builder()
                .memberId(googleMemberDto.getMemberId())
                .memberEmail(googleMemberDto.getMemberEmail())
                .memberName(googleMemberDto.getMemberName())
                .memberImage(googleMemberDto.getMemberImage())
                .build();
    }


    //이거 해야댐
    public KakaoMemberDto kakaoJsonToDto(JsonNode userInfo) {
        String memberEmail = userInfo.path("kakao_account").path("email").isMissingNode() ?
                null : userInfo.path("kakao_account").path("email").asText();

        String memberName = userInfo.path("kakao_account").path("profile").path("nickname").isMissingNode() ?
                null : userInfo.path("kakao_account").path("profile").path("nickname").asText();

        String memberImage = userInfo.path("kakao_account").path("profile").path("thumbnail_image_url").isMissingNode() ?
                null : userInfo.path("kakao_account").path("profile").path("thumbnail_image_url").asText();
        String memberId = userInfo.path("id").isMissingNode() ?
                null : userInfo.path("id").asText();
        return KakaoMemberDto.builder()
                .memberId(memberId)
                .memberEmail(memberEmail)
                .memberName(memberName)
                .memberImage(memberImage)
                .build();
    }

    public Member kakaoMemberDtoToEntity(KakaoMemberDto kakaoMemberDto) {
        return Member.builder()
                .memberId(kakaoMemberDto.getMemberId())
                .memberEmail(kakaoMemberDto.getMemberEmail())
                .memberName(kakaoMemberDto.getMemberName())
                .memberImage(kakaoMemberDto.getMemberImage())
                .build();
    }
}
