package com.varabc.problem.domain.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@ToString
@NoArgsConstructor
@Data
public class GetProblemDto {

    //fromt에서 받아올 때 사용하는 dto. multipart 있음.
    private String problemTitle;
    private String problemContent;
    private String problemLevel;
    private String problemInputContent;
    private String problemOutputContent;
    private String problemLink;
    private String problemSource;
    private String problemAlgorithmType;
    private List<MultipartFile> problemImageList = new ArrayList<>();

    //문제 제한
    private Double problemRestrictionTimePython;
    private Double problemRestrictionTimeJava;
    private int problemRestrictionMemory;


    //테케
    private List<MultipartFile> testcaseInputPublicList = new ArrayList<MultipartFile>();
    private List<MultipartFile> testcaseOutputPublicList = new ArrayList<MultipartFile>();
    //비공개 테케
    private List<MultipartFile> testcaseInputPrivateList = new ArrayList<MultipartFile>();
    private List<MultipartFile> testcaseOutputPrivateList = new ArrayList<MultipartFile>();


    @Builder
    public GetProblemDto(String problemTitle, String problemContent, String problemLevel,
            String problemInputContent, String problemOutputContent, String problemLink,
            String problemSource, String problemAlgorithmType,
            List<MultipartFile> problemImageList, Double problemRestrictionTimePython,
            Double problemRestrictionTimeJava, int problemRestrictionMemory,
             List<MultipartFile> testcaseInputPublicList,
            List<MultipartFile> testcaseOutputPublicList,
            List<MultipartFile> testcaseInputPrivateList,
            List<MultipartFile> testcaseOutputPrivateList) {
        this.problemTitle = problemTitle;
        this.problemContent = problemContent;
        this.problemLevel = problemLevel;
        this.problemInputContent = problemInputContent;
        this.problemOutputContent = problemOutputContent;
        this.problemLink = problemLink;
        this.problemSource = problemSource;
        this.problemAlgorithmType = problemAlgorithmType;
        this.problemImageList = problemImageList;
        this.problemRestrictionTimePython = problemRestrictionTimePython;
        this.problemRestrictionTimeJava = problemRestrictionTimeJava;
        this.problemRestrictionMemory = problemRestrictionMemory;
        this.testcaseInputPublicList = testcaseInputPublicList;
        this.testcaseOutputPublicList = testcaseOutputPublicList;
        this.testcaseInputPrivateList = testcaseInputPrivateList;
        this.testcaseOutputPrivateList = testcaseOutputPrivateList;
    }
}
