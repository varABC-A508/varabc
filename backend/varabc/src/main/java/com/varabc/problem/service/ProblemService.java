package com.varabc.problem.service;

import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import java.io.IOException;

public interface ProblemService {

    ProblemDto getProblem(Long problemNo);

    void createProblem(GetProblemDto getProblemDto) throws IOException;

    void deleteProblem(Long problemNo);

    void updateProblem(Long problemNo, GetProblemDto getProblemDto);

    void updateProblemImage(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    void updateTestCase(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    void saveTestCaseToS3(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    void saveImageToS3(Long problemNo, GetProblemDto getProblemDto) throws IOException;
}