package com.varabc.problem.service;

import com.varabc.admin.controller.AwsS3Controller;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.dto.TestcaseListDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import com.varabc.problem.mapper.ProblemMapper;
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
    private final ProblemMapper problemMapper;
    private final AwsS3Controller awsS3Controller;

    public ProblemDto getProblem(Long problemNo) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        ProblemRestriction problemRestriction = problemRestrictionRepository.findByProblemNo(
                problemNo);
        List<TestCase> testCaseList = testcaseRepository.findByProblemNo(problemNo);
        if (problem == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 없음");
            return null;
        }else{
            ProblemDto problemDto =  problemMapper.mapIntoOneProblemDto(problem, problemRestriction,
                    testCaseList);
            return problemDto;
        }

    }


    @Override
    public void createProblem(ProblemDto problemDto)
            throws IOException {
        //문제 테이블에 저장
        System.out.println("problemDto: " + problemDto.toString());
        Problem problem = problemMapper.dtoToProblemEntity(problemDto);
        System.out.println("problemEntity " + problem.toString());
        problemRepository.save(problem);
        //방금 저장한 문제 번호 가져오기
        Long problemNo = problem.getProblemNo();
        //문제 제약사항 그 테이블에 저장
        ProblemRestriction problemRestriction = problemMapper.dtoToProblemRestrictionEntity(
                problemDto, problemNo);
        problemRestrictionRepository.save(problemRestriction);
        //문제 테케를 이제 하나하나 빼서 넣어주는 작업 필요
        //리스트 길이만큼 for 돌리기
        for (int i = 0; i < problemDto.getTestcaseInputList().size();
                i++) {//이거 여기다 둘껀지, service로 보낼건지
            //input 하나 빼서 s3에 저장, 그리고 그 주소 반환필요. string으로.
            String inputUrl = awsS3Controller.upload(problemDto.getTestcaseInputList().get(i));
            String outputUrl = awsS3Controller.upload(problemDto.getTestcaseOutputList().get(i));
//                boolean isPublic = problemDto.getTestcasePublicList().get(i);
//                TestcaseDto testcaseDto= new TestcaseDto(inputUrl,outputUrl,isPublic);
            // 공개 여부를 프론트에서 어떻게 넘길껀지에 따라 다르니까
            TestcaseDto testcaseDto = new TestcaseDto(problemNo,inputUrl,outputUrl,false);
            TestCase testcase = problemMapper.dtoToTestcaseEntity(testcaseDto);
            testcaseRepository.save(testcase);
        }


    }

    @Transactional
    public void updateProblem(Long problemNo, ProblemDto problemDto) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        if (problem == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 이미 없음");
        } else {
            // ModelMapper를 사용하여 DTO의 값을 엔티티에 복사
            modelMapper.map(problemDto, problem);
            System.out.println(problem.toString());
            ProblemRestriction problemRestriction = problemRestrictionRepository.findByProblemNo(
                    problemNo);
            problemMapper.dtoToProblemRestrictionEntity(problemDto, problemNo);
            System.out.println(problemRestriction.toString());

        }
    }


    @Transactional
    public void updateTestcase(Long problemNo, TestcaseListDto testcaseListDto) throws IOException {
        //problemno 로 지우려는 데이터들을 싹 뽑아와서 리스트에 저장해둔다.
        List<TestCase> testCaseListList = testcaseRepository.findByProblemNo(
                problemNo); //entity에 저장하는걸로 바꿔야한다. 이거 일단 바꾼거라 문제생길듯. 돌리기 전에 확인
        System.out.println("testcselist's problem no : " + problemNo);
        // s3에 접근해서 데이터 싹 날려야한다.
        for (int i = 0; i < testCaseListList.size(); i++) {
           TestcaseDto testcaseDto= problemMapper.convertEntityToDto(testCaseListList.get(i));
            awsS3Controller.remove(String.valueOf(testcaseDto.getTestcaseInput()));
            awsS3Controller.remove(String.valueOf(testcaseDto.getTestcaseOutput()));

        }
        testcaseRepository.delete(testcaseListDto.getProblemNo());
        System.out.println("deleted, " + testcaseRepository.findByProblemNo(problemNo).toString()); //여기서 에러나야 정상.
        //그리고 들어온 값들을 s3에 다 싹 저장해야한다.
        //리스트 길이만큼 for 돌리기
        System.out.println("/n/n");
        System.out.println(testcaseListDto.toString());
        System.out.println("/n/n");
        for (int i = 0; i < testcaseListDto.getTestcaseInputList().size(); i++) {
            //input 하나 빼서 s3에 저장, 그리고 그 주소 반환필요. string으로.
            String inputUrl = awsS3Controller.upload(testcaseListDto.getTestcaseInputList().get(i));
            String outputUrl = awsS3Controller.upload(
                    testcaseListDto.getTestcaseOutputList().get(i));
            //이제 이거 저장해줘야
            TestcaseDto testcaseDto = new TestcaseDto(problemNo,inputUrl,outputUrl,false);
            TestCase testcase = problemMapper.dtoToTestcaseEntity(testcaseDto);
            testcaseRepository.save(testcase);
        }

        //그리고 그 링크들로 db에 값들을 update 시켜야한다.
    }


    @Transactional
    public void deleteProblem(Long problemNo) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        if (problem == null) {
            System.out.println("해당 problemNo에 대한 데이터가 없는 경우");
        } else {
            problemRepository.updateProblemResign(problemNo);
            problemRestrictionRepository.updateProblemRestrictionResign(problemNo);
            testcaseRepository.updateTestcaseResign(problemNo);
        }
    }


}
