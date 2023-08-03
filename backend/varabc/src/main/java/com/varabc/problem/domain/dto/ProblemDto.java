package com.varabc.problem.domain.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;


@Getter
@ToString
@NoArgsConstructor
public class ProblemDto {

    //    private Long problemNo;
    private String problemTitle;
    private String problemContent;
    private String problemLevel;
    private int problemSubmitCount;
    private int problemCorrectCount;
    private String problemInputContent;
    private String problemOutputContent;
    private String problemLink;
    private String problemSource;
    private Boolean problemResign ;
    private String problemAlgorithmType;

    //문제 제한
    private Double problemRestrictionPython;
    private Double problemRestrictionJava;
    private int problemRestrictionMemory;
    private Boolean problemRestrictionResign ;


    //테케
    private List<MultipartFile> testcaseInputList = new ArrayList<MultipartFile>();
    private List<MultipartFile> testcaseOutputList = new ArrayList<MultipartFile>();

    //테케 디티오.
    private List<TestcaseDto> testcaseDtoList = new ArrayList<>();



    @Builder
    public ProblemDto(String problemTitle, String problemContent, String problemLevel,
            int problemSubmitCount, int problemCorrectCount, String problemInputContent,
            String problemOutputContent, String problemLink, String problemSource,
            Boolean problemResign, String problemAlgorithmType, Double problemRestrictionPython,
            Double problemRestrictionJava, int problemRestrictionMemory,
            Boolean problemRestrictionResign, List<MultipartFile> testcaseInputList,
            List<MultipartFile> testcaseOutputList, List<TestcaseDto> testcaseDtoList) {
        this.problemTitle = problemTitle;
        this.problemContent = problemContent;
        this.problemLevel = problemLevel;
        this.problemSubmitCount = problemSubmitCount;
        this.problemCorrectCount = problemCorrectCount;
        this.problemInputContent = problemInputContent;
        this.problemOutputContent = problemOutputContent;
        this.problemLink = problemLink;
        this.problemSource = problemSource;
        this.problemResign = problemResign;
        this.problemAlgorithmType = problemAlgorithmType;
        this.problemRestrictionPython = problemRestrictionPython;
        this.problemRestrictionJava = problemRestrictionJava;
        this.problemRestrictionMemory = problemRestrictionMemory;
        this.problemRestrictionResign = problemRestrictionResign;
        this.testcaseInputList = testcaseInputList;
        this.testcaseOutputList = testcaseOutputList;
        this.testcaseDtoList = testcaseDtoList;
    }
    //    ProblemDto.ProblemDtoBuilder builder = ProblemDto.builder()
//            .problemTitle(problemEntity.getProblemTitle())
//            .problemContent(problemEntity.getProblemContent())
//            .problemLevel(problemEntity.getProblemLevel())
//            .problemSubmitCount(problemEntity.getProblemSubmitCount())
//            .problemCorrectCount(problemEntity.getProblemCorrectCount())
//            .problemInputContent(problemEntity.getProblemInputContent())
//            .problemOutputContent(problemEntity.getProblemOutputContent())
//            .problemLink(problemEntity.getProblemLink())
//            .problemSource(problemEntity.getProblemSource())
//            .problemResign(problemResignValue)
//            .problemAlgorithmType(problemEntity.getProblemAlgorithmType())
//            .problemRestrictionPython(problemRestrictionEntity.getProblemRestrictionPython())
//            .problemRestrictionJava(problemRestrictionEntity.getProblemRestrictionJava())
//            .problemRestrictionMemory(problemRestrictionEntity.getProblemRestrictionMemory())
//            .problemRestrictionResign(problemRestrictionResignValue);
}
