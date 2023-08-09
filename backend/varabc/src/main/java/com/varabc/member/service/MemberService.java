package com.varabc.member.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.member.domain.entity.Member;

public interface MemberService {
    public Member saveGoogleMember(JsonNode userInfo);
    public Member saveKakaoMember(JsonNode userInfo);
    public void saveRefreshToken(long memberNo, String refreshToken);
}
