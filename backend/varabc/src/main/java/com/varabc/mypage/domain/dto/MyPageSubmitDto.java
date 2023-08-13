package com.varabc.mypage.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class MyPageSubmitDto {

    //문제, 결과, 메모리, 시간, 언어, 제출시간.
    String nickname;
    int memberExp;
    Long submitNo;
    Long competitionResultNo;
    Long problemNo;
    String submitStatus;
    int submitUsedMemory;
    double submitUsedTime;
    String submitLanguage;
    String submitTime;
    String problemTitle;

    @Builder
    public MyPageSubmitDto(String nickname,int memberExp,Long submitNo, Long competitionResultNo, Long problemNo,
            String submitStatus,
            int submitUsedMemory, double submitUsedTime, String submitLanguage, String submitTime,String problemTitle) {
        this.nickname = nickname;
        this.memberExp = memberExp;
        this.submitNo = submitNo;
        this.competitionResultNo = competitionResultNo;
        this.problemNo = problemNo;
        this.submitStatus = submitStatus;
        this.submitUsedMemory = submitUsedMemory;
        this.submitUsedTime = submitUsedTime;
        this.submitLanguage = submitLanguage;
        this.submitTime = submitTime;
        this.problemTitle = problemTitle;
    }
}
