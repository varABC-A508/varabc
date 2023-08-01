package com.varabc.problem.domain.dto;
import com.varabc.problem.domain.entity.ProblemEntity;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

@Getter
@ToString
@NoArgsConstructor
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
    private List<MultipartFile> testcaseInputList= new ArrayList<MultipartFile>();
    private List<MultipartFile> testcaseOutputList= new ArrayList<MultipartFile>();
    private List<Boolean> testcasePublicList = new ArrayList<Boolean>();

    public ProblemEntity toEntity(ModelMapper modelMapper) {
        return modelMapper.map(this, ProblemEntity.class);
    }
}
