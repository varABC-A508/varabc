package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import com.varabc.problem.domain.entity.TestcaseEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class MapperServiceImpl implements MapperService{
    private final ModelMapper modelMapper;

    public MapperServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ProblemEntity toProblemEntity(ProblemDto problemDto) {
        return modelMapper.map(problemDto, ProblemEntity.class);
    }

    public ProblemRestrictionEntity toProblemRestrictionEntity(ProblemDto problemDto, Long problemNo) {
        ProblemRestrictionEntity problemRestrictionEntity = modelMapper.map(problemDto, ProblemRestrictionEntity.class);
        problemRestrictionEntity.setProblemNo(problemNo);
        return problemRestrictionEntity;
    }

    @Override
    public TestcaseEntity toTestcaseEntity(ProblemDto problemDto, Long problemNo) {
        TestcaseEntity testcaseEntity = modelMapper.map(problemDto, TestcaseEntity.class);
        testcaseEntity.setProblemNo(problemNo);
        return testcaseEntity;
    }

//    public Entity3 toEntity3(Dto dto) {
//        return modelMapper.map(dto, Entity3.class);
//    }

}
