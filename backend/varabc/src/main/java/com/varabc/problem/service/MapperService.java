package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;

public interface MapperService {
    ProblemEntity toProblemEntity(ProblemDto problemDto);
    ProblemRestrictionEntity toProblemRestrictionEntity(ProblemDto problemDto, Long problemNo);
    // Entity3 toEntity3(Dto dto);
}