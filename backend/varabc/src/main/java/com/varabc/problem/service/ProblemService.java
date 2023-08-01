package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import java.io.IOException;
import java.util.List;

public interface ProblemService {
    ProblemEntity save(ProblemDto problemDto);

    ProblemDto getProblem(Long problemNo);

    void updateProblem(Long problemNo, ProblemDto problemDto);
//이것들 void 말고 결과값 반환하거나 에러 코드 반환하는 코드로 고쳐주기
    void deleteProblem(Long problemNo);

    void createProblem(ProblemDto problemDto, List<TestcaseDto> testcaseDtoList) throws IOException;
}