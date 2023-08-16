package com.varabc.problem.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class RandomProblemDto {
    private String problemLevel;
    private String problemSource;

    @Builder
    public RandomProblemDto(String problemLevel, String problemSource) {
        this.problemLevel = problemLevel;
        this.problemSource = problemSource;
    }
}
