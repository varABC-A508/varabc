package com.varabc.validation.domain.dto;


import com.varabc.validation.domain.util.FileData;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ValidateDto {
    private String code;
    private int timeLimit;
    private int memoryLimit;
    private List<FileData> inputFiles;
    private List<FileData> outputFiles;
}
