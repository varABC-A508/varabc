package com.varabc.problem.domain.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class TestCaseDto {

    private Long testCaseNo;
    private Long problemNo;
    private String testCaseInput;
    private String testCaseOutput;
    private boolean testCaseResign;
    private boolean testCasePublic;

    @Builder

    public TestCaseDto(Long testCaseNo, Long problemNo, String testCaseInput, String testCaseOutput,
            boolean testCaseResign, boolean testCasePublic) {
        this.testCaseNo = testCaseNo;
        this.problemNo = problemNo;
        this.testCaseInput = testCaseInput;
        this.testCaseOutput = testCaseOutput;
        this.testCaseResign = testCaseResign;
        this.testCasePublic = testCasePublic;
    }
}
