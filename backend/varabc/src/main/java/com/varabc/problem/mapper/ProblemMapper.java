package com.varabc.problem.mapper;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import java.util.List;


public interface ProblemMapper {

    TestcaseDto convertEntityToDto(TestCase testcase);

    Problem dtoToProblemEntity(ProblemDto problemDto);

    ProblemRestriction dtoToProblemRestrictionEntity(ProblemDto problemDto, Long problemNo);

//    TestcaseEntity dtoToTestcaseEntity(TestcaseDto testcaseDto, Long problemNo);

    TestCase dtoToTestcaseEntity(TestcaseDto testcaseDto);

    ProblemDto mapIntoOneProblemDto(Problem problem,
            ProblemRestriction problemRestriction,
            List<TestCase> testCaseList);
}