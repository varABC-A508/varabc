package com.varabc.problem.domain.dto;
import com.varabc.problem.domain.entity.ProblemEntity;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ProblemDto {
//    private Long problemNo;
    private String problemTitle;
    private String problemContent;
    private double problemTimeLimit;
    private int problemMemoryLimit;
    private String problemLevel;
    private int problemSubmitCount;
    private int problemCorrectCount;
    private String problemInputContent;
    private String problemOutputContent;
    private String problemLink;
    private String problemSource;
    private Boolean problemResign;

    public ProblemEntity toEntity(){
        return ProblemEntity.builder()
                .problemTitle(problemTitle)
                .problemContent(problemContent)
                .problemTimeLimit(problemTimeLimit)
                .problemMemoryLimit(problemMemoryLimit)
                .problemLevel(problemLevel)
                .problemInputContent(problemInputContent)
                .problemOutputContent(problemOutputContent)
                .problemLink(problemLink)
                .problemSource(problemSource)
                .build();
    }

    
}
