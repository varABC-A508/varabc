package com.varabc.problem.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@Setter
public class CheckUpdateDto {
    private boolean problemUpdate=false;
    private boolean testCaseUpdate =false;
    private boolean problemContentUpdate=false;

    @Builder
    public CheckUpdateDto(Boolean problemUpdate, Boolean testCaseUpdate,
            Boolean problemContentUpdate) {
        this.problemUpdate = problemUpdate;
        this.testCaseUpdate = testCaseUpdate;
        this.problemContentUpdate = problemContentUpdate;
    }
}
