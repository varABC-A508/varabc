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
public class TestCaseListDto {
    private List<MultipartFile> testCaseInputList= new ArrayList<MultipartFile>();
    private List<MultipartFile> testCaseOutputList= new ArrayList<MultipartFile>();
}
