package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import com.varabc.problem.domain.entity.TestcaseEntity;
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

    public ProblemEntity dtoToProblemEntity(ProblemDto problemDto) {
        ProblemEntity problemEntity = modelMapper.map(problemDto, ProblemEntity.class);
        if (problemEntity.getProblemResign() == null) {
            problemEntity.setProblemResign(false);
        }
        return problemEntity;
    }

    public ProblemRestrictionEntity dtoToProblemRestrictionEntity(ProblemDto problemDto,
            Long problemNo) {
        ProblemRestrictionEntity problemRestrictionEntity = modelMapper.map(problemDto,
                ProblemRestrictionEntity.class);
        if (problemRestrictionEntity.getProblemRestrictionResign() == null) {
            problemRestrictionEntity.setProblemRestrictionResign(false);
        }
        problemRestrictionEntity.setProblemNo(problemNo);
        return problemRestrictionEntity;
    }

//    @Override
//    public TestcaseEntity dtoToTestcaseEntity(TestcaseDto testcaseDto, Long problemNo) {
//        TestcaseEntity testcaseEntity = modelMapper.map(testcaseDto, TestcaseEntity.class);
//        testcaseEntity.setProblemNo(problemNo);
//        return testcaseEntity;
//    }

    @Override
    public TestcaseEntity dtoToTestcaseEntity(TestcaseDto testcaseDto) {
        return modelMapper.map(testcaseDto, TestcaseEntity.class);
    }

    @Override
    public ProblemDto mapIntoOneProblemDto(ProblemEntity problemEntity,
            ProblemRestrictionEntity problemRestrictionEntity,
            List<TestcaseEntity> testcaseEntityList) {
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
        List<TestcaseDto> testcaseDtoList = new ArrayList<>();
        for (TestcaseEntity testcaseEntity : testcaseEntityList) {
            TestcaseDto testcaseDto = convertEntityToDto(testcaseEntity);
            testcaseDtoList.add(testcaseDto);
        }
        builder.testcaseDtoList(testcaseDtoList);

        return builder.build();
    }

    @Override
    public TestcaseDto convertEntityToDto(TestcaseEntity entity) {
        return modelMapper.map(entity, TestcaseDto.class);
    }
}