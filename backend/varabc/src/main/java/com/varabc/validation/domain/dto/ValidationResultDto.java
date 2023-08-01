package com.varabc.validation.domain.dto;


import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class ValidationResultDto {
    //채점 결과를 db에 저장할 dto
    private String result;
    private double executionTime;
    private String memoryUsage;
    private String exceptionMessage;


    @Builder
    public ValidationResultDto(String result, double executionTime, String memoryUsage,
            String exceptionMessage) {
        this.result = result;
        this.executionTime = executionTime;
        this.memoryUsage = memoryUsage;
        this.exceptionMessage = exceptionMessage;
    }
}
