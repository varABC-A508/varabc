package com.problemsolvingjava.validate.domain.dto;

import java.util.List;
import lombok.Data;

@Data
public class SubmitDto {
    private String code;
    private List<TestCaseDto> testCases;
}
