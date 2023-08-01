package com.varabc.problem.domain.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class TestcaseDto {
   private String testcaseInput;

    private String testcaseOutput;
    private Boolean testcaseResign;
    private Boolean testcasePublic;

    public TestcaseDto(String inputUrl, String outputUrl, boolean isPublic) {
        this.testcaseInput = inputUrl;
        this.testcaseOutput= outputUrl;
        this.testcasePublic=isPublic;
    }
    //이걸 생성자 말고 빌더로 만들어보기.

}
