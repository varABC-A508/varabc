package com.varabc.validation.domain.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class ProblemRestrictionDto {
    private Long problemRestrictionNo;
    private Long problemNo;
    private Double problemRestrictionPython;
    private Double problemRestrictionJava;
    private int problemRestrictionMemory;
    private Boolean problemRestrictionResign;

    @Builder
    public ProblemRestrictionDto(Long problemRestrictionNo, Long problemNo,
            Double problemRestrictionPython, Double problemRestrictionJava,
            int problemRestrictionMemory, Boolean problemRestrictionResign) {
        this.problemRestrictionNo = problemRestrictionNo;
        this.problemNo = problemNo;
        this.problemRestrictionPython = problemRestrictionPython;
        this.problemRestrictionJava = problemRestrictionJava;
        this.problemRestrictionMemory = problemRestrictionMemory;
        this.problemRestrictionResign = problemRestrictionResign;
    }
}
