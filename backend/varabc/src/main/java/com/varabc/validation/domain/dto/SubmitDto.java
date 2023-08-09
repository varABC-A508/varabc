package com.varabc.validation.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@ToString
@NoArgsConstructor
public class SubmitDto {
    private long submitNo;
    private long problemNo;
    private long memberNo;
    private long competitionResultNo;
    private int submitMode;
    private int submitStatus;
    private String submitCode;
    private String submitTime;
    private int submitUsedMemory;
    private double submitUsedTime;
    private String submitLanguage;

    @Builder
    public SubmitDto(long submitNo, long problemNo, long memberNo,
            long competitionResultNo,
            int submitMode, int submitStatus, String submitCode, String submitTime,
            int submitUsedMemory, double submitUsedTime, String submitLanguage) {
        this.submitNo = submitNo;
        this.problemNo = problemNo;
        this.memberNo = memberNo;
        this.competitionResultNo = competitionResultNo;
        this.submitMode = submitMode;
        this.submitStatus = submitStatus;
        this.submitCode = submitCode;
        this.submitTime = submitTime;
        this.submitUsedMemory = submitUsedMemory;
        this.submitUsedTime = submitUsedTime;
        this.submitLanguage = submitLanguage;
    }
}
