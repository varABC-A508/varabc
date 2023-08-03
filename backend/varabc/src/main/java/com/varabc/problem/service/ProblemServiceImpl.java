package com.varabc.problem.service;

import com.varabc.admin.controller.AwsS3Controller;
import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.ProblemImageDto;
import com.varabc.problem.domain.dto.TestCaseDto;
import com.varabc.problem.domain.dto.TestCaseListDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemImage;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import com.varabc.problem.mapper.ProblemMapper;
import com.varabc.problem.repository.ProblemImageRepository;
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
    private final ProblemImageRepository problemImageRepository;
    private final ModelMapper modelMapper;
    private final ProblemMapper problemMapper;
    private final AwsS3Controller awsS3Controller;

    public ProblemDto getProblem(Long problemNo) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        ProblemRestriction problemRestrictionEntity = problemRestrictionRepository.findByProblemNo(
                problemNo);
        List<TestCase> testcaseEntityList = testcaseRepository.findByProblemNo(problemNo);
        if (problem == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 없음");
            return null;
        } else {
            ProblemDto problemDto = problemMapper.mapIntoOneProblemDto(problem,
                    problemRestrictionEntity, testcaseEntityList);
            return problemDto;
        }
    }

    @Override
    public void createProblem(GetProblemDto getProblemDto)
            throws IOException {
        //문제 테이블에 저장
        System.out.println("problemDto: " + getProblemDto.toString());
        //넘어온 값에서 entity로 잘 매칭시켜서 db에 저장하는 작업 필요.
        Problem problem = problemMapper.dtoToProblemEntity(getProblemDto);
        System.out.println("problemEntity " + problem.toString());
        problemRepository.save(problem);
        //방금 저장한 문제 번호 가져오기
        Long problemNo = problem.getProblemNo();
        //문제 제약사항 그 테이블에 저장
        ProblemRestriction problemRestriction = problemMapper.dtoToProblemRestrictionEntity(
                getProblemDto, problemNo);
        problemRestrictionRepository.save(problemRestriction);
        //문제 테케를 이제 하나하나 빼서 넣어주는 작업 필요
        //리스트 길이만큼 for 돌리기
        //input 하나 빼서 s3에 저장, 그리고 그 주소 반환필요. string으로.
        //공개 테케
        for (int i = 0; i < getProblemDto.getTestcaseInputPublicList().size();
                i++) {
            String inputUrl = awsS3Controller.upload(getProblemDto.getTestcaseInputPublicList().get(i));
            String outputUrl = awsS3Controller.upload(getProblemDto.getTestcaseOutputPublicList().get(i));

            TestCaseDto testcaseDto = new TestCaseDto(problemNo, inputUrl, outputUrl, false);
            TestCase testcase = problemMapper.dtoToTestcaseEntity(testcaseDto);
            testcaseRepository.save(testcase);
        }
        //비공개 테케
        for (int i = 0; i < getProblemDto.getTestcaseInputPublicList().size();
                i++) {
            String inputUrl = awsS3Controller.upload(getProblemDto.getTestcaseInputPrivateList().get(i));
            String outputUrl = awsS3Controller.upload(getProblemDto.getTestcaseOutputPrivateList().get(i));
            TestCaseDto testcaseDto = new TestCaseDto(problemNo, inputUrl, outputUrl, true);
            TestCase testcase = problemMapper.dtoToTestcaseEntity(testcaseDto);
            testcaseRepository.save(testcase);
        }

        //문제 이미지 저장 필요. s3에 저장하고.
        for (int i = 0; i < getProblemDto.getProblemImageList().size();
                i++) {
            String imgUrl = awsS3Controller.upload(getProblemDto.getProblemImageList().get(i));
            ProblemImageDto problemImageDto = new ProblemImageDto(problemNo,imgUrl);
            ProblemImage problemImage = problemMapper.dtoToProblemImageEntity(problemImageDto,problemNo);
            problemImageRepository.save(problemImage);
        }
    }

//    @Transactional
//    public void updateProblem(Long problemNo, ProblemDto problemDto) {
//        Problem problemEntity = problemRepository.findById(problemNo).orElse(null);
//        if (problemEntity == null) {
//            //  해당 problemNo에 대한 데이터가 없는 경우
//            System.out.println("그런 문제 이미 없음");
//        } else {
//            // ModelMapper를 사용하여 DTO의 값을 엔티티에 복사
//            modelMapper.map(problemDto, problemEntity);
//            System.out.println(problemEntity.toString());
//            ProblemRestriction problemRestrictionEntity = problemRestrictionRepository.findByProblemNo(
//                    problemNo);
//            problemMapper.dtoToProblemRestrictionEntity(problemDto, problemNo);
//            System.out.println(problemRestrictionEntity.toString());
//
//        }
//    }
//
//    @Transactional
//    public void updateTestcase(Long problemNo, TestCaseListDto testcaseListDto) throws IOException {
//        //problemno 로 지우려는 데이터들을 싹 뽑아와서 리스트에 저장해둔다.
//        List<TestCase> testcaseEntityListList = testcaseRepository.findByProblemNo(
//                problemNo); //entity에 저장하는걸로 바꿔야한다. 이거 일단 바꾼거라 문제생길듯. 돌리기 전에 확인
//        System.out.println("testcselist's problem no : " + problemNo);
//        // s3에 접근해서 데이터 싹 날려야한다.
//        for (int i = 0; i < testcaseEntityListList.size(); i++) {
//            TestCaseDto testcaseDto = problemMapper.convertEntityToDto(
//                    testcaseEntityListList.get(i));
//            awsS3Controller.remove(String.valueOf(testcaseDto.getTestcaseInput()));
//            awsS3Controller.remove(String.valueOf(testcaseDto.getTestcaseOutput()));
//
//        }
//        testcaseRepository.delete(problemNo);
//        System.out.println("deleted, " + testcaseRepository.findByProblemNo(problemNo)
//                .toString()); //여기서 에러나야 정상.
//        //그리고 들어온 값들을 s3에 다 싹 저장해야한다.
//        //리스트 길이만큼 for 돌리기
//        System.out.println("/n/n");
//        System.out.println(testcaseListDto.toString());
//        System.out.println("/n/n");
//        for (int i = 0; i < testcaseListDto.getTestcaseInputList().size(); i++) {
//            //input 하나 빼서 s3에 저장, 그리고 그 주소 반환필요. string으로.
//            String inputUrl = awsS3Controller.upload(testcaseListDto.getTestcaseInputList().get(i));
//            String outputUrl = awsS3Controller.upload(
//                    testcaseListDto.getTestcaseOutputList().get(i));
//            //이제 이거 저장해줘야
//            TestCaseDto testcaseDto = new TestCaseDto(problemNo, inputUrl, outputUrl, false);
//            TestCase testcaseEntity = problemMapper.dtoToTestcaseEntity(testcaseDto);
//            testcaseRepository.save(testcaseEntity);
//        }
//
//        //그리고 그 링크들로 db에 값들을 update 시켜야한다.
//    }
//
//    @Transactional
//    public void deleteProblem(Long problemNo) {
//        Problem problemEntity = problemRepository.findById(problemNo).orElse(null);
//        if (problemEntity == null) {
//            System.out.println("해당 problemNo에 대한 데이터가 없는 경우");
//        } else {
//            problemRepository.updateProblemResign(problemNo);
//            problemRestrictionRepository.updateProblemRestrictionResign(problemNo);
////            List<TestcaseEntity> testcaseEntityListList = testcaseRepository.findByProblemNo(
////                    problemNo);
////            for (int i = 0; i < testcaseEntityListList.size(); i++) {
////                TestcaseDto testcaseDto= problemMapper.convertEntityToDto(testcaseEntityListList.get(i));
////                awsS3Controller.remove(String.valueOf(testcaseDto.getTestcaseInput()));
////                awsS3Controller.remove(String.valueOf(testcaseDto.getTestcaseOutput()));
////            } //s3에서 삭제할건지.
//            testcaseRepository.updateTestcaseResign(problemNo);
//        }
//    }
}
