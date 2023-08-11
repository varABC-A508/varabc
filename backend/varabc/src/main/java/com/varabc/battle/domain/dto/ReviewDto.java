package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class ReviewDto {

    private boolean reviewTagReadability;
    private boolean reviewTagNaming;
    private boolean reviewTagSpeed;
    private boolean reviewTagCommunication;
    private Long reviewReceiveMemberNo;
    private Long reviewSendMemberNo;
    private String reviewContent;

    @Builder
    public ReviewDto(boolean reviewTagReadability, boolean reviewTagNaming, boolean reviewTagSpeed,
            boolean reviewTagCommunication, Long reviewReceiveMemberNo, Long reviewSendMemberNo,
            String reviewContent) {
        this.reviewTagReadability = reviewTagReadability;
        this.reviewTagNaming = reviewTagNaming;
        this.reviewTagSpeed = reviewTagSpeed;
        this.reviewTagCommunication = reviewTagCommunication;
        this.reviewReceiveMemberNo = reviewReceiveMemberNo;
        this.reviewSendMemberNo = reviewSendMemberNo;
        this.reviewContent = reviewContent;
    }
}