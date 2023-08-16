package com.varabc.mypage.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class MyPageReviewDto {
    private boolean reviewTagReadability;
    private boolean reviewTagNaming;
    private boolean reviewTagSpeed;
    private boolean reviewTagCommunication;
    private Long reviewReceiveMemberNo;
    private Long reviewSendMemberNo;
    private String reviewContent;
    private Long competitionResultNo;

    @Builder
    public MyPageReviewDto(boolean reviewTagReadability, boolean reviewTagNaming,
            boolean reviewTagSpeed, boolean reviewTagCommunication, Long reviewReceiveMemberNo,
            Long reviewSendMemberNo, String reviewContent, Long competitionResultNo) {
        this.reviewTagReadability = reviewTagReadability;
        this.reviewTagNaming = reviewTagNaming;
        this.reviewTagSpeed = reviewTagSpeed;
        this.reviewTagCommunication = reviewTagCommunication;
        this.reviewReceiveMemberNo = reviewReceiveMemberNo;
        this.reviewSendMemberNo = reviewSendMemberNo;
        this.reviewContent = reviewContent;
        this.competitionResultNo = competitionResultNo;
    }
}
