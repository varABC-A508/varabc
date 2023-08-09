package com.varabc.problem.domain.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class PublicProblemDto {
    private Long problemNo;
    private String problemTitle;
    private String problemContent;
    private String problemLevel;
    private int problemSubmitCount;
    private int problemCorrectCount;
    private String problemInputContent;
    private String problemOutputContent;
    private String problemSource;
    private String problemAlgorithmType;
    //문제 이미지 테이블.
    private List<String> problemImageS3Url = new ArrayList<>();

    //문제 제한
    private Double problemRestrictionPython;
    private Double problemRestrictionJava;
    private int problemRestrictionMemory;

    //테케
    private List<String> testCaseInputList = new ArrayList<>();
    private List<String> testCaseOutputList = new ArrayList<>();

    @Builder
    public PublicProblemDto(Long problemNo, String problemTitle, String problemContent,
            String problemLevel, int problemSubmitCount, int problemCorrectCount,
            String problemInputContent, String problemOutputContent, String problemSource,
            String problemAlgorithmType, List<String> problemImageS3Url,
            Double problemRestrictionPython, Double problemRestrictionJava,
            int problemRestrictionMemory, List<String> testCaseInputList,
            List<String> testCaseOutputList) {
        this.problemNo = problemNo;
        this.problemTitle = problemTitle;
        this.problemContent = problemContent;
        this.problemLevel = problemLevel;
        this.problemSubmitCount = problemSubmitCount;
        this.problemCorrectCount = problemCorrectCount;
        this.problemInputContent = problemInputContent;
        this.problemOutputContent = problemOutputContent;
        this.problemSource = problemSource;
        this.problemAlgorithmType = problemAlgorithmType;
        this.problemImageS3Url = problemImageS3Url;
        this.problemRestrictionPython = problemRestrictionPython;
        this.problemRestrictionJava = problemRestrictionJava;
        this.problemRestrictionMemory = problemRestrictionMemory;
        this.testCaseInputList = testCaseInputList;
        this.testCaseOutputList = testCaseOutputList;
    }
}
