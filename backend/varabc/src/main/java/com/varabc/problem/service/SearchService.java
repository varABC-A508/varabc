package com.varabc.problem.service;


import com.varabc.problem.domain.dto.ProblemListDto;
import com.varabc.problem.mapper.ProblemMapper;
import com.varabc.problem.repository.ProblemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final ProblemRepository problemRepository;
    private final ProblemMapper problemMapper;
    public String makeCompareBit(List<Integer> algoType){
        String compareBit="000000000000";
        StringBuilder stringBuilder = new StringBuilder(compareBit);
        for(int i=0; i<algoType.size();i++){
            stringBuilder.setCharAt(algoType.get(i)-1,'1');
        }
        compareBit=stringBuilder.toString();
        return compareBit;
    }
    public List<ProblemListDto> searchProblems(String keyword, List<Integer> algoType) {
        String compareBit=makeCompareBit(algoType);
        return problemMapper.problemEntityListToDtoList(problemRepository.findByProblemTitleContainingAndProblemAlgorithmType(keyword, compareBit));
    }

    public List<ProblemListDto> searchProblemsOnlyKey(String keyword) {
        return problemMapper.problemEntityListToDtoList(problemRepository.findByProblemTitleContaining(keyword));
    }

    public List<ProblemListDto> searchProblemsByNo(long problemNo, List<Integer> algoType){
        String compareBit=makeCompareBit(algoType);
        return problemMapper.problemEntityListToDtoList(problemRepository.findByProblemNoAndProblemAlgorithmType(problemNo, compareBit));
    }
    public List<ProblemListDto> searchProblemsOnlyProblemNo(long problemNo){
        return problemMapper.problemEntityListToDtoList(problemRepository.findByProblemNoContaining(problemNo));
    }
    public List<ProblemListDto> searchProblemsOnlyAlgorithmType(List<Integer> algoType){
        String compareBit=makeCompareBit(algoType);
        return problemMapper.problemEntityListToDtoList(problemRepository.findByProblemAlgorithmType(compareBit));
    }
}
