package com.varabc.problem.mapper;

import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.ProblemImageDto;
import com.varabc.problem.domain.dto.TestCaseDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemImage;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public class ProblemMapper{



    public Problem dtoToProblemEntity(ProblemDto problemDto) {
        return Problem.builder()
                .problemTitle(problemDto.getProblemTitle())
                .problemContent(problemDto.getProblemContent())
                .problemLevel(problemDto.getProblemLevel())
                .problemInputContent(problemDto.getProblemInputContent())
                .problemOutputContent(problemDto.getProblemOutputContent())
                .problemLink(problemDto.getProblemLink())
                .problemSource(problemDto.getProblemSource())
                .problemAlgorithmType(problemDto.getProblemAlgorithmType())
                .build();
    }

    public Problem dtoToProblemEntity(GetProblemDto getProblemDto) {
        //초기값으로 넣고 생성하고 싶은데 구냥 이렇게 여기서 바로 적어서 넣어버려도 될련지
       return Problem.builder()
               .problemTitle(getProblemDto.getProblemTitle())
               .problemContent(getProblemDto.getProblemContent())
               .problemLevel(getProblemDto.getProblemLevel())
               .problemInputContent(getProblemDto.getProblemInputContent())
               .problemOutputContent(getProblemDto.getProblemOutputContent())
               .problemLink(getProblemDto.getProblemLink())
               .problemSource(getProblemDto.getProblemSource())
               .problemAlgorithmType(getProblemDto.getProblemAlgorithmType())
               .build();
    }

    public ProblemRestriction dtoToProblemRestrictionEntity(GetProblemDto getProblemDto,
            Long problemNo) {
        return ProblemRestriction.builder()
                .problemNo(problemNo)
                .problemRestrictionTimePython(getProblemDto.getProblemRestrictionTimePython())
                .problemRestrictionTimeJava(getProblemDto.getProblemRestrictionTimeJava())
                .problemRestrictionMemory(getProblemDto.getProblemRestrictionMemory())
                .build();
    }

    public TestCase dtoToTestcaseEntity(TestCaseDto testcaseDto, Long problemNo) {
        return TestCase.builder()
                .testcaseInput(testcaseDto.getTestcaseInput())
                .testcaseOutput(testcaseDto.getTestcaseOutput())
                .testcasePublic(testcaseDto.getTestcasePublic())
                .problemNo(problemNo)
                .build();
    }

    public TestCase dtoToTestcaseEntity(TestCaseDto testcaseDto) {
        return TestCase.builder()
                .testcaseInput(testcaseDto.getTestcaseInput())
                .testcaseOutput(testcaseDto.getTestcaseOutput())
                .testcasePublic(testcaseDto.getTestcasePublic())
                .problemNo(testcaseDto.getProblemNo())
                .build();
    }

    public ProblemDto mapIntoOneProblemDto(Problem problemEntity,
            ProblemRestriction problemRestrictionEntity,
            List<TestCase> testcaseEntityList) {
        Boolean problemResignValue =
                problemEntity.getProblemResign() != null ? problemEntity.getProblemResign() : false;
        Boolean problemRestrictionResignValue =
                problemRestrictionEntity.getProblemRestrictionResign() != null
                        ? problemRestrictionEntity.getProblemRestrictionResign() : false;

        ProblemDto.ProblemDtoBuilder builder = ProblemDto.builder()
                .problemTitle(problemEntity.getProblemTitle())
                .problemContent(problemEntity.getProblemContent())
                .problemLevel(problemEntity.getProblemLevel())
                .problemSubmitCount(problemEntity.getProblemSubmitCount())
                .problemCorrectCount(problemEntity.getProblemCorrectCount())
                .problemInputContent(problemEntity.getProblemInputContent())
                .problemOutputContent(problemEntity.getProblemOutputContent())
                .problemLink(problemEntity.getProblemLink())
                .problemSource(problemEntity.getProblemSource())
                .problemResign(problemResignValue)
                .problemAlgorithmType(problemEntity.getProblemAlgorithmType())
                .problemRestrictionPython(problemRestrictionEntity.getProblemRestrictionPython())
                .problemRestrictionJava(problemRestrictionEntity.getProblemRestrictionJava())
                .problemRestrictionMemory(problemRestrictionEntity.getProblemRestrictionMemory())
                .problemRestrictionResign(problemRestrictionResignValue);

        // TestcaseEntity 리스트를 TestcaseDto 리스트로 변환하여 ProblemDto에 추가
        List<TestCaseDto> testcaseDtoList = new ArrayList<>();
        for (TestCase testcaseEntity : testcaseEntityList) {
            TestCaseDto testcaseDto = convertEntityToDto(testcaseEntity);
            testcaseDtoList.add(testcaseDto);
        }
        builder.testcaseDtoList(testcaseDtoList);

        return builder.build();
    }

    public ProblemImage dtoToProblemImageEntity(ProblemImageDto problemImageDto,Long problemNo) {
        return ProblemImage.builder()
                .problemImageS3Url(problemImageDto.getProblemImageS3Url())
                .problemNo(problemNo)
                .build();
    }

    public TestCaseDto convertEntityToDto(TestCase testCase) {
        return TestCaseDto.builder()
                .problemNo(testCase.getProblemNo())
                .testcaseInput(testCase.getTestcaseInput())
                .testcaseOutput(testCase.getTestcaseOutput())
                .testcasePublic(testCase.getTestcasePublic())
                .build();
    }
}