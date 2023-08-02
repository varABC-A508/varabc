package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import com.varabc.problem.domain.entity.TestcaseEntity;
import java.util.List;


public interface ProblemMapper {

    TestcaseDto convertEntityToDto(TestcaseEntity testcaseEntity);

    ProblemEntity dtoToProblemEntity(ProblemDto problemDto);

    ProblemRestrictionEntity dtoToProblemRestrictionEntity(ProblemDto problemDto, Long problemNo);

//    TestcaseEntity dtoToTestcaseEntity(TestcaseDto testcaseDto, Long problemNo);

    TestcaseEntity dtoToTestcaseEntity(TestcaseDto testcaseDto);

    ProblemDto mapIntoOneProblemDto(ProblemEntity problemEntity,
            ProblemRestrictionEntity problemRestrictionEntity,
            List<TestcaseEntity> testcaseEntityList);
}