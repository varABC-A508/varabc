package com.problemsolvingjava.validate.domain.dto;

import java.util.List;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class SubmitDto {
    private String code;
    private List<TestCaseDto> testCases;
    private int timeLimit;
    private int memoryLimit;
}
