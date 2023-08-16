package com.varabc.member.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.member.domain.dto.MemberDto;
import com.varabc.member.domain.entity.Member;
import java.util.List;

public interface MemberService {
    Member saveGoogleMember(JsonNode userInfo);
    Member saveKakaoMember(JsonNode userInfo);
    void saveRefreshToken(long memberNo, String refreshToken);
    MemberDto getMemberByMemberNo(long memberNo);
    void updateMemberNickname(String memberNickname, long memberNo);
    boolean findMemberNickname(String memberNickname);
    String getEmail(Long memberNo);

    List<MemberDto> getMember();

    boolean deleteMember(long memberNo);
}
