package com.varabc.validation.domain.dto;


import com.varabc.validation.domain.util.FileData;
import java.util.List;
import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class ValidateDto {

    private long memberNo;
    private long problemNo;
    private String code;
    private double timeLimit;
    private int memoryLimit;
    private List<FileData> inputFiles;
    private List<FileData> outputFiles;
    private String language;


    @Builder
    public ValidateDto(long memberNo, long problemNo, String code, double timeLimit,
            int memoryLimit,
            List<FileData> inputFiles, List<FileData> outputFiles, String language) {
        this.memberNo = memberNo;
        this.problemNo = problemNo;
        this.code = code;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
        this.inputFiles = inputFiles;
        this.outputFiles = outputFiles;
        this.language = language;
    }
}
