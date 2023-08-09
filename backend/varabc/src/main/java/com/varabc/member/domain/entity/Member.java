package com.varabc.member.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @Column(name = "member_no", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberNo;
    @Column(name = "member_nickname")
    private String memberNickname;
    @Column(name = "member_email",nullable = false)
    private String memberEmail;
    @Column(name = "member_exp")
    private int memberExp;
    @Column(name = "member_image")
    private String memberImage;
    @Column(name = "member_admin")
    private boolean memberAdmin;
    @Column(name = "member_resign")
    private boolean memberResign;
    @Column(name = "member_name", nullable = false)
    private String memberName;
    @Column(name = "member_token", length = 400)
    private String memberToken;

    public void updateMemberExp(int memberExp){
        this.memberExp=memberExp;
    }
    public void updateMemberResign(boolean memberResign){
        this.memberResign=memberResign;
    }
    public void updateMemberName(String memberName){
        this.memberName=memberName;
    }
    public void updateMemberNickname(String memberNickname){
        this.memberNickname=memberNickname;
    }
    public void updateMemberToken(String memberToken) { this.memberToken=memberToken; }

    @Builder
    public Member(String memberNickname, String memberEmail, int memberExp, String memberImage,
            boolean memberAdmin, boolean memberResign, String memberName) {
        this.memberNickname = memberNickname;
        this.memberEmail = memberEmail;
        this.memberExp = memberExp;
        this.memberImage = memberImage;
        this.memberAdmin = memberAdmin;
        this.memberResign = memberResign;
        this.memberName = memberName;
    }
}
