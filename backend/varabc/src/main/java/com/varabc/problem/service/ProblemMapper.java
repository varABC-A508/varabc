package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import com.varabc.problem.domain.entity.TestcaseEntity;


public interface ProblemMapper {
    ProblemEntity toProblemEntity(ProblemDto problemDto);
    ProblemRestrictionEntity toProblemRestrictionEntity(ProblemDto problemDto, Long problemNo);

    TestcaseEntity toTestcaseEntity(TestcaseDto testcaseDto, Long problemNo);
    // Entity3 toEntity3(Dto dto);
}