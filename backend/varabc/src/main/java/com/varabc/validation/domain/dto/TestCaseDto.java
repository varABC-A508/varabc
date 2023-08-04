package com.varabc.validation.domain.dto;

import java.util.List;
import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class TestCaseDto {
    private List<String> inputFiles;
    private List<String> outputFiles;

    @Builder
    public TestCaseDto(List<String> inputFiles, List<String> outputFiles) {
        this.inputFiles = inputFiles;
        this.outputFiles = outputFiles;
    }
}
