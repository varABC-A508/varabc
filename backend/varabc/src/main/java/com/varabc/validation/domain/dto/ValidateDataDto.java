package com.varabc.validation.domain.dto;


import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class ValidateDataDto {
    //여기 memberId도 선언해줘야함.
    private long memberNo;
    private long problemNo;
    private String code;

    @Builder
    public ValidateDataDto(long memberNo, long problemNo, String code) {
        this.memberNo = memberNo;
        this.problemNo = problemNo;
        this.code = code;
    }
}

