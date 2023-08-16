package com.varabc.problem.service;

import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.ProblemListDto;
import com.varabc.problem.domain.dto.PublicProblemDto;
import com.varabc.problem.domain.dto.RandomProblemDto;
import java.io.IOException;
import java.util.List;

public interface ProblemService {

    ProblemDto getProblem(Long problemNo);

    void createProblem(GetProblemDto getProblemDto) throws IOException;

    boolean deleteProblem(Long problemNo);

    void updateProblem(Long problemNo, GetProblemDto getProblemDto);

    void updateProblemImage(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    void updateTestCase(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    void saveTestCaseToS3(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    void saveImageToS3(Long problemNo, GetProblemDto getProblemDto) throws IOException;

    List<ProblemListDto> getList();

    PublicProblemDto getProblemPublic(Long problemNo);

    void updateProblemCounts(Long problemNo,int correct);

    Long getRandomProblem(RandomProblemDto randomProblemDto);
}