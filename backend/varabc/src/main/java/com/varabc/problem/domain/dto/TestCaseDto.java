package com.varabc.problem.domain.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class TestCaseDto {
   private String testcaseInput;

    private String testcaseOutput;
    private Boolean testcaseResign;
    private Boolean testcasePublic;
}
