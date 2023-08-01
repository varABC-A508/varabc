package com.varabc.validation.domain.dto;


import com.varabc.validation.domain.util.FileData;
import java.util.List;
import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class ValidateDto {
    private String code;
    private int timeLimit;
    private int memoryLimit;
    private List<FileData> inputFiles;
    private List<FileData> outputFiles;



    @Builder
    public ValidateDto(String code, int timeLimit, int memoryLimit, List<FileData> inputFiles,
            List<FileData> outputFiles) {
        this.code = code;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
        this.inputFiles = inputFiles;
        this.outputFiles = outputFiles;
    }
}
