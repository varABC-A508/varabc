package com.varabc.problem.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class ProblemListDto {

    private Long problemNo;
    private String problemTitle;
    private int problemSubmitCount;
    private int problemCorrectCount;

    @Builder
    public ProblemListDto(Long problemNo, String problemTitle, int problemSubmitCount,
            int problemCorrectCount) {
        this.problemNo = problemNo;
        this.problemTitle = problemTitle;
        this.problemSubmitCount = problemSubmitCount;
        this.problemCorrectCount = problemCorrectCount;
    }
}
