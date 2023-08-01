package com.varabc.problem.service;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import com.varabc.problem.domain.entity.TestcaseEntity;
import com.varabc.problem.repository.ProblemRepository;
import com.varabc.problem.repository.ProblemRestrictionRepository;
import com.varabc.problem.repository.TestcaseRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
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
    private final ProblemMapper mapperService;

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


    @Transactional
    public void deleteProblem(Long problemNo) {
        ProblemEntity problemEntity = problemRepository.findById(problemNo).orElse(null);
        if (problemEntity == null) {
            System.out.println("해당 problemNo에 대한 데이터가 없는 경우");
        } else {
            problemRepository.updateProblemResign(problemNo);
            problemRestrictionRepository.updateProblemRestrictionResign(problemNo);
            testcaseRepository.updateTestcaseResign(problemNo);
        }
    }

    @Override
    public void createProblem(ProblemDto problemDto, List<TestcaseDto> testcaseDtoList)
            throws IOException {
        //문제 테이블에 저장
        ProblemEntity problemEntity = mapperService.toProblemEntity(problemDto);
        problemRepository.save(problemEntity);
        //방금 저장한 문제 번호 가져오기
        Long problemNo = problemEntity.getProblemNo();
        //문제 제약사항 그 테이블에 저장
        ProblemRestrictionEntity problemRestrictionEntity = mapperService.toProblemRestrictionEntity(
                problemDto, problemNo);
        problemRestrictionRepository.save(problemRestrictionEntity);
        //문제 테케를 이제 하나하나 빼서 넣어주는 작업 필요
        //리스트 길이만큼 for 돌리기

        if (!testcaseDtoList.isEmpty()) {
//            String inputUrl = awsS3Controller.upload(problemDto.getTestcaseInputList().get(0));
//            System.out.println(inputUrl);
            for (int i = 0; i < testcaseDtoList.size(); i++) {
                //entity로 등록 후 넣기.
                TestcaseEntity testcaseEntity = mapperService.toTestcaseEntity(
                        testcaseDtoList.get(i), problemNo);
                testcaseRepository.save(testcaseEntity);
            }

        }

    }

}
