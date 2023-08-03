package com.varabc.problem.service;

import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestCaseListDto;
import java.io.IOException;

public interface ProblemService {

    ProblemDto getProblem(Long problemNo);

    void createProblem(GetProblemDto getProblemDto) throws IOException;

//    void updateProblem(Long problemNo, ProblemDto problemDto);
//    //이것들 void 말고 결과값 반환하거나 에러 코드 반환하는 코드로 고쳐주기
//
//    void updateTestcase(Long problemNo, TestCaseListDto testcaseListDto) throws IOException;
//
//    void deleteProblem(Long problemNo);
}