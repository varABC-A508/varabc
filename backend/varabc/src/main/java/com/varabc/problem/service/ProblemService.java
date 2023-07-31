package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;

public interface ProblemService {
    ProblemEntity save(ProblemDto problemDto);

    ProblemDto getProblem(Long problemNo);

    void updateProblem(Long problemNo, ProblemDto problemDto);

    void deleteProblem(Long problemNo);

    void createProblem(ProblemDto problemDto);
}