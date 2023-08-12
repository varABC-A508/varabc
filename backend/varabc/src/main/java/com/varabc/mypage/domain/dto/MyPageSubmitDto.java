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
    Long submitNo;
    Long competitionResultNo;
    Long problemNo;
    String submitStatus;
    int submitUsedMemory;
    double submitUsedTime;
    String submitLanguage;
    String submitTime;

    @Builder
    public MyPageSubmitDto(Long submitNo, Long competitionResultNo, Long problemNo,
            String submitStatus,
            int submitUsedMemory, double submitUsedTime, String submitLanguage, String submitTime) {
        this.submitNo = submitNo;
        this.competitionResultNo = competitionResultNo;
        this.problemNo = problemNo;
        this.submitStatus = submitStatus;
        this.submitUsedMemory = submitUsedMemory;
        this.submitUsedTime = submitUsedTime;
        this.submitLanguage = submitLanguage;
        this.submitTime = submitTime;
    }
}
