package com.varabc.member.domain.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@Getter
@ToString
public class MemberDto {
    private long memberNo;
    private String memberNickname;
    private String memberEmail;
    private int memberExp;
    private String memberImage;
    private boolean memberAdmin;
    private boolean memberResign;
    private String memberName;

    @Builder
    public MemberDto(long memberNo, String memberNickname, String memberEmail, int memberExp, String memberImage, boolean memberAdmin, boolean memberResign, String memberName) {
        this.memberNo = memberNo;
        this.memberNickname = memberNickname;
        this.memberEmail = memberEmail;
        this.memberExp = memberExp;
        this.memberImage = memberImage;
        this.memberAdmin = memberAdmin;
        this.memberResign = memberResign;
        this.memberName = memberName;
    }
}
