package com.varabc.validation.domain.dto;


import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class ValidateDataDto {
    //여기 memberId도 선언해줘야함.
    private long problemNo;
    private String code;
    private int timeLimit;
    private int memoryLimit;

    @Builder
    public ValidateDataDto(long problemNo, String code, int timeLimit, int memoryLimit) {
        this.problemNo = problemNo;
        this.code = code;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
    }
}

