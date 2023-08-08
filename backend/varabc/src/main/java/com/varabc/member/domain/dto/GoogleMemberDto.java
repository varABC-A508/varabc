package com.varabc.member.domain.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
public class GoogleMemberDto {
    private String memberEmail;
    private String memberName;
    private String memberImage;

    @Builder
    public GoogleMemberDto(String memberEmail, String memberName, String memberImage) {
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.memberImage = memberImage;
    }
}
