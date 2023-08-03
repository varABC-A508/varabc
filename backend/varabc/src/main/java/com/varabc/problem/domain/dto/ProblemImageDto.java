package com.varabc.problem.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class ProblemImageDto {

    private Long problemImageDto;
    private Long problemNo;
    private String problemImageS3Url;
    private Boolean problemImageResign;

    @Builder
    public ProblemImageDto(Long problemNo, String problemImageS3Url) {
        this.problemNo = problemNo;
        this.problemImageS3Url = problemImageS3Url;
    }
}
