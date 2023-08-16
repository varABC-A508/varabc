package com.problemsolvingjava.validate.domain.dto;


import com.problemsolvingjava.validate.domain.util.FileData;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}

