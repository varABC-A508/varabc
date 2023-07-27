package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.repository.ProblemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final ModelMapper modelMapper;

    public ProblemEntity save(ProblemDto problemDto) {
        return problemRepository.save(problemDto.toEntity());
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
            System.out.println(problemDto.getProblemTitle());
            System.out.println(problemEntity.getProblemTitle());
            modelMapper.map(problemDto, problemEntity);
            System.out.println(problemDto.getProblemTitle());
            System.out.println(problemEntity.getProblemTitle());
            problemRepository.save(problemEntity);
        }
    }

    public void deleteProblem(Long problemNo) {
        ProblemEntity problemEntity = problemRepository.findById(problemNo).orElse(null);
        if (problemEntity == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 이미 없음");
        } else {
            problemRepository.delete(problemEntity);
        }
    }


}
