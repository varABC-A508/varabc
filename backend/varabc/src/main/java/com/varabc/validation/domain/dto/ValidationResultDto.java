package com.varabc.validation.domain.dto;


import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class ValidationResultDto {
    //채점 결과를 db에 저장할 dto
    private long problemNo;
    private int result;
    private double executionTime;
    private int memoryUsage;
    private String exceptionMessage;


    @Builder
    public ValidationResultDto(long problemNo, int result, double executionTime,
            int memoryUsage, String exceptionMessage) {
        this.problemNo = problemNo;
        this.result = result;
        this.executionTime = executionTime;
        this.memoryUsage = memoryUsage;
        this.exceptionMessage = exceptionMessage;
    }
}
