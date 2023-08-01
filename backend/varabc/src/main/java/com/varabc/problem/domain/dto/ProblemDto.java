package com.varabc.problem.domain.dto;
import com.varabc.problem.domain.entity.ProblemEntity;
import lombok.Data;
import lombok.Getter;
import org.modelmapper.ModelMapper;

@Data
@Getter
public class ProblemDto {
//    private Long problemNo;
    private String problemTitle;
    private String problemContent;
    private String problemLevel;
    private int problemSubmitCount;
    private int problemCorrectCount;
    private String problemInputContent;
    private String problemOutputContent;
    private String problemLink;
    private String problemSource;
    private Boolean problemResign;
    private String problemAlgorithmType;

    //문제 제한
    private Double problemRestrictionPython;
    private Double problemRestrictionJava;
    private int problemRestrictionMemory;
    private Boolean problemRestrictionResign;


    //테케
    private String testcaseInput;
    private String testcaseOutput;
    private Boolean testcasePublic;
    private Boolean testcaseResign;

    public ProblemEntity toEntity(ModelMapper modelMapper) {
        return modelMapper.map(this, ProblemEntity.class);
    }
}
