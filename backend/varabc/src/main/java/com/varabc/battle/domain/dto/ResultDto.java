package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class
ResultDto {
    //프론트로 반환해줘야 하는 데이터.
    private Long problemNo;
    private int result;
    private double executionTime;
    private int memoryUsage;
    private String exceptionMessage;
    private String resultMessage;
    private String redirectUrl;
    @Builder
    public ResultDto(Long problemNo, int result, double executionTime, int memoryUsage,
            String exceptionMessage, String resultMessage,String redirectUrl) {
        this.problemNo = problemNo;
        this.result = result;
        this.executionTime = executionTime;
        this.memoryUsage = memoryUsage;
        this.exceptionMessage = exceptionMessage;
        this.resultMessage=resultMessage;
        this.redirectUrl = redirectUrl;
    }
}
