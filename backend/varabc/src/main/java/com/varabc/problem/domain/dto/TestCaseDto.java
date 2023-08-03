package com.varabc.problem.domain.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class TestCaseDto {

    private Long testcaseNo;
    private Long problemNo;
    private String testcaseInput;
    private String testcaseOutput;
    private Boolean testcaseResign;
    private Boolean testcasePublic;

    @Builder
    public TestCaseDto(Long problemNo, String testcaseInput, String testcaseOutput,
            Boolean testcasePublic) {
        this.problemNo = problemNo;
        this.testcaseInput = testcaseInput;
        this.testcaseOutput = testcaseOutput;
        this.testcasePublic = testcasePublic;
    }

}
