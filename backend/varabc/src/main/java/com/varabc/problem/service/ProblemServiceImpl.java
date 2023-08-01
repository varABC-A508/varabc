package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import com.varabc.problem.domain.entity.TestcaseEntity;
import com.varabc.problem.repository.ProblemRepository;
import com.varabc.problem.repository.ProblemRestrictionRepository;
import com.varabc.problem.repository.TestcaseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final ProblemRestrictionRepository problemRestrictionRepository;
    private final TestcaseRepository testcaseRepository;
    private final ModelMapper modelMapper;
    private final MapperService mapperService;
    public ProblemEntity save(ProblemDto problemDto) {

        return problemRepository.save(problemDto.toEntity(modelMapper));
    }

    public ProblemDto getProblem(Long problemNo) {
        ProblemEntity problemEntity = problemRepository.findById(problemNo).orElse(null);

        if (problemEntity == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 없음");
            return null;
        }
        return modelMapper.map(problemEntity, ProblemDto.class);
    }

    @Transactional
    public void updateProblem(Long problemNo, ProblemDto problemDto) {
        ProblemEntity problemEntity = problemRepository.findById(problemNo).orElse(null);
        if (problemEntity == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 이미 없음");
        } else {
            // ModelMapper를 사용하여 DTO의 값을 엔티티에 복사
            modelMapper.map(problemDto, problemEntity);
            problemRepository.save(problemEntity);
        }
    }

//    public void deleteProblem(Long problemNo) {
//        ProblemEntity problemEntity = problemRepository.findById(problemNo).orElse(null);
//        if (problemEntity == null) {
//            //  해당 problemNo에 대한 데이터가 없는 경우
//            System.out.println("그런 문제 이미 없음");
//        } else {
//            problemRepository.delete(problemEntity);
//        }
//    }

    @Transactional
    public void deleteProblem(Long problemNo) {
        ProblemEntity problemEntity = problemRepository.findById(problemNo).orElse(null);
        if (problemEntity == null) {
            System.out.println("해당 problemNo에 대한 데이터가 없는 경우");
        } else {
            problemRepository.updateProblemResign(problemNo);
            problemRepository.save(problemEntity);
        }
    }

    @Override
    public void createProblem(ProblemDto problemDto) {
        ProblemEntity problemEntity = mapperService.toProblemEntity(problemDto);
        problemRepository.save(problemEntity);
        Long problemNo = problemEntity.getProblemNo();
        System.out.println(problemNo);
        ProblemRestrictionEntity problemRestrictionEntity = mapperService.toProblemRestrictionEntity(problemDto, problemNo);
        problemRestrictionRepository.save(problemRestrictionEntity);
        TestcaseEntity testcaseEntity = mapperService.toTestcaseEntity(problemDto, problemNo);
        testcaseRepository.save(testcaseEntity);
    }

}
