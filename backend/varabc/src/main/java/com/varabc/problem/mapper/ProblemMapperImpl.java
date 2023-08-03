package com.varabc.problem.mapper;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ProblemMapperImpl implements ProblemMapper {

    private final ModelMapper modelMapper;

    public ProblemMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public Problem dtoToProblemEntity(ProblemDto problemDto) {
        Problem problem = modelMapper.map(problemDto, Problem.class);
        if (problem.getProblemResign() == null) {
            problem.setProblemResign(false);
        }
        return problem;
    }

    public ProblemRestriction dtoToProblemRestrictionEntity(ProblemDto problemDto,
            Long problemNo) {
        ProblemRestriction problemRestriction = modelMapper.map(problemDto,
                ProblemRestriction.class);
        if (problemRestriction.getProblemRestrictionResign() == null) {
            problemRestriction.setProblemRestrictionResign(false);
        }
        problemRestriction.setProblemNo(problemNo);
        return problemRestriction;
    }

//    @Override
//    public TestcaseEntity dtoToTestcaseEntity(TestcaseDto testcaseDto, Long problemNo) {
//        TestcaseEntity testcaseEntity = modelMapper.map(testcaseDto, TestcaseEntity.class);
//        testcaseEntity.setProblemNo(problemNo);
//        return testcaseEntity;
//    }

    @Override
    public TestCase dtoToTestcaseEntity(TestcaseDto testcaseDto) {
        return modelMapper.map(testcaseDto, TestCase.class);
    }

    @Override
    public ProblemDto mapIntoOneProblemDto(Problem problem,
            ProblemRestriction problemRestriction,
            List<TestCase> testCaseList) {
        Boolean problemResignValue =
                problem.getProblemResign() != null ? problem.getProblemResign() : false;
        Boolean problemRestrictionResignValue =
                problemRestriction.getProblemRestrictionResign() != null
                        ? problemRestriction.getProblemRestrictionResign() : false;

        ProblemDto.ProblemDtoBuilder builder = ProblemDto.builder()
                .problemTitle(problem.getProblemTitle())
                .problemContent(problem.getProblemContent())
                .problemLevel(problem.getProblemLevel())
                .problemSubmitCount(problem.getProblemSubmitCount())
                .problemCorrectCount(problem.getProblemCorrectCount())
                .problemInputContent(problem.getProblemInputContent())
                .problemOutputContent(problem.getProblemOutputContent())
                .problemLink(problem.getProblemLink())
                .problemSource(problem.getProblemSource())
                .problemResign(problemResignValue)
                .problemAlgorithmType(problem.getProblemAlgorithmType())
                .problemRestrictionPython(problemRestriction.getProblemRestrictionPython())
                .problemRestrictionJava(problemRestriction.getProblemRestrictionJava())
                .problemRestrictionMemory(problemRestriction.getProblemRestrictionMemory())
                .problemRestrictionResign(problemRestrictionResignValue);

        // TestcaseEntity 리스트를 TestcaseDto 리스트로 변환하여 ProblemDto에 추가
        List<TestcaseDto> testcaseDtoList = new ArrayList<>();
        for (TestCase testcase : testCaseList) {
            TestcaseDto testcaseDto = convertEntityToDto(testcase);
            testcaseDtoList.add(testcaseDto);
        }
        builder.testcaseDtoList(testcaseDtoList);

        return builder.build();
    }

    @Override
    public TestcaseDto convertEntityToDto(TestCase entity) {
        return modelMapper.map(entity, TestcaseDto.class);
    }
}