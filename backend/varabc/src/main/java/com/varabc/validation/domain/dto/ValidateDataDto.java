package com.varabc.validation.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateDataDto {

    //여기 memberId도 선언해줘야함.
    private long problemNo;
    private String code;
    private int timeLimit;
    private int memoryLimit;
}

