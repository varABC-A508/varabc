package com.varabc.problem.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class ProblemImageDto {

    private Long problemImageNo;
    private Long problemNo;
    private String problemImageS3Url;
    private boolean problemImageResign;

    @Builder
    public ProblemImageDto(Long problemImageNo, Long problemNo, String problemImageS3Url,
            boolean problemImageResign) {
        this.problemImageNo = problemImageNo;
        this.problemNo = problemNo;
        this.problemImageS3Url = problemImageS3Url;
        this.problemImageResign = problemImageResign;
    }
}
