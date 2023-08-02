package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseListDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import java.io.IOException;

public interface ProblemService {

    ProblemDto getProblem(Long problemNo);

    void createProblem(ProblemDto problemDto) throws IOException;

    void updateProblem(Long problemNo, ProblemDto problemDto);
    //이것들 void 말고 결과값 반환하거나 에러 코드 반환하는 코드로 고쳐주기

    void updateTestcase(Long problemNo, TestcaseListDto testcaseListDto) throws IOException;

    void deleteProblem(Long problemNo);
}