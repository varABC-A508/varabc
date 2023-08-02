package com.varabc.problem.domain.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;
@Getter
@ToString
@NoArgsConstructor
public class TestcaseListDto {
    private Long problemNo;
    private List<MultipartFile> testcaseInputList= new ArrayList<MultipartFile>();
    private List<MultipartFile> testcaseOutputList= new ArrayList<MultipartFile>();
}
