package com.varabc.member.domain.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
public class GoogleMemberDto {
    private String memberId;
    private String memberEmail;
    private String memberName;
    private String memberImage;

    @Builder
    public GoogleMemberDto(String memberId, String memberEmail, String memberName,
            String memberImage) {
        this.memberId = memberId;
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.memberImage = memberImage;
    }
}
