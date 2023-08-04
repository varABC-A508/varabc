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
public class ProblemMapper {

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
                .problemResign(false)
                .build();
    }

    public ProblemRestriction dtoToProblemRestrictionEntity(GetProblemDto getProblemDto,
            Long problemNo) {
        return ProblemRestriction.builder()
                .problemNo(problemNo)
                .problemRestrictionTimePython(getProblemDto.getProblemRestrictionTimePython())
                .problemRestrictionTimeJava(getProblemDto.getProblemRestrictionTimeJava())
                .problemRestrictionMemory(getProblemDto.getProblemRestrictionMemory())
                .problemRestrictionResign(false)
                .build();
    }

    public TestCase dtoToTestCaseEntity(TestCaseDto testCaseDto, Long problemNo) {
        return TestCase.builder()
                .testCaseInput(testCaseDto.getTestCaseInput())
                .testCaseOutput(testCaseDto.getTestCaseOutput())
                .testCasePublic(testCaseDto.isTestCasePublic())
                .problemNo(problemNo)
                .testCaseResign(false)
                .build();
    }

    public TestCase dtoToTestCaseEntity(TestCaseDto testCaseDto) {
        return TestCase.builder()
                .testCaseInput(testCaseDto.getTestCaseInput())
                .testCaseOutput(testCaseDto.getTestCaseOutput())
                .testCasePublic(testCaseDto.isTestCasePublic())
                .problemNo(testCaseDto.getProblemNo())
                .testCaseResign(false)
                .build();
    }

    public ProblemDto mapIntoOneProblemDto(Problem problemEntity,
            ProblemRestriction problemRestrictionEntity,
            List<TestCase> testCaseEntityList, List<ProblemImage> problemImageList) {

        ProblemDto.ProblemDtoBuilder builder = ProblemDto.builder()
                .problemTitle(problemEntity.getProblemTitle())
                .problemContent(problemEntity.getProblemContent())
                .problemLevel(problemEntity.getProblemLevel())
                .problemSubmitCount(problemEntity.getProblemSubmitCount())
                .problemCorrectCount(problemEntity.getProblemCorrectCount())
                .problemInputContent(problemEntity.getProblemInputContent())
                .problemOutputContent(problemEntity.getProblemOutputContent())
                .problemSource(problemEntity.getProblemSource())
                .problemAlgorithmType(problemEntity.getProblemAlgorithmType())
                .problemRestrictionPython(problemRestrictionEntity.getProblemRestrictionTimePython())
                .problemRestrictionJava(problemRestrictionEntity.getProblemRestrictionTimeJava())
                .problemRestrictionMemory(problemRestrictionEntity.getProblemRestrictionMemory())
                .problemResign(problemEntity.isProblemResign())
                .problemRestrictionResign(problemRestrictionEntity.isProblemRestrictionResign());

        // TestcaseEntity 리스트를 TestcaseDto 리스트로 변환하여 각 리스트로 미리 추출, build 할 때 넣을 수 있게. ProblemDto에 추가
        List<TestCaseDto> testCaseDtoList = new ArrayList<>();
        for (TestCase testCaseEntity : testCaseEntityList) {
            TestCaseDto testCaseDto = convertEntityToDto(testCaseEntity);
            testCaseDtoList.add(testCaseDto);
        }
        List<String> testCaseInputLists = new ArrayList<>();
        List<String> testCaseOutputLists = new ArrayList<>();
        for (int i=0;i<testCaseDtoList.size();i++) {
            testCaseInputLists.add(testCaseDtoList.get(i).getTestCaseInput());
            testCaseOutputLists.add(testCaseDtoList.get(i).getTestCaseOutput());
        }

        builder.testCaseInputList(testCaseInputLists);
        builder.testCaseOutputList(testCaseOutputLists);

        //problemImageList 를 problemImageDto 리스트로 만들어서 넣어보기.
        List<String> problemImageS3UrlList = new ArrayList<>();
        for(ProblemImage problemImage:problemImageList){
            ProblemImageDto problemImageDto = convertEntityToDto(problemImage);
            problemImageS3UrlList.add(problemImageDto.getProblemImageS3Url());
        }
        builder.problemImageS3Url(problemImageS3UrlList);
        return builder.build();
    }

    public ProblemImageDto convertEntityToDto(ProblemImage problemImage) {
        return ProblemImageDto.builder()
                .problemNo(problemImage.getProblemNo())
                .problemImageS3Url(problemImage.getProblemImageS3Url())
                .build();
    }

    public ProblemImage dtoToProblemImageEntity(ProblemImageDto problemImageDto, Long problemNo) {
        return ProblemImage.builder()
                .problemNo(problemNo)
                .problemImageS3Url(problemImageDto.getProblemImageS3Url())
                .problemImageResign(false)
                .build();
    }

    public TestCaseDto convertEntityToDto(TestCase testCase) {
        return TestCaseDto.builder()
                .problemNo(testCase.getProblemNo())
                .testCaseInput(testCase.getTestCaseInput())
                .testCaseOutput(testCase.getTestCaseOutput())
                .testCasePublic(testCase.isTestCasePublic())
                .build();
    }

    public TestCaseDto createTestCaseDto(Long problemNo, String inputUrl, String outputUrl, boolean b) {
        return TestCaseDto.builder()
                .problemNo(problemNo)
                .testCaseInput(inputUrl)
                .testCaseOutput(outputUrl)
                .testCasePublic(b)
                .testCaseResign(false)
                .build();

    }

    public ProblemImageDto createProblemImageDto(Long problemNo, String imgUrl) {
        return ProblemImageDto.builder()
                .problemNo(problemNo)
                .problemImageS3Url(imgUrl)
                .problemImageResign(false)
                .build();
    }
}