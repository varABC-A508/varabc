package com.varabc.validation.domain.dto;


import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class CompileResultDto {
    private List<String> output;
    private long problemNo;
    private int result;
    private double executionTime;
    private int memoryUsage;
    private String exceptionMessage;


    @Builder
    public CompileResultDto(List<String> output, long problemNo, int result, double executionTime,
            int memoryUsage, String exceptionMessage) {
        this.output = output;
        this.problemNo = problemNo;
        this.result = result;
        this.executionTime = executionTime;
        this.memoryUsage = memoryUsage;
        this.exceptionMessage = exceptionMessage;
    }
}
