package com.varabc.problem.service;

import com.varabc.admin.controller.AwsS3Controller;
import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.ProblemImageDto;
import com.varabc.problem.domain.dto.ProblemListDto;
import com.varabc.problem.domain.dto.PublicProblemDto;
import com.varabc.problem.domain.dto.RandomProblemDto;
import com.varabc.problem.domain.dto.TestCaseDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemImage;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import com.varabc.problem.mapper.ProblemMapper;
import com.varabc.problem.repository.ProblemImageRepository;
import com.varabc.problem.repository.ProblemRepository;
import com.varabc.problem.repository.ProblemRestrictionRepository;
import com.varabc.problem.repository.TestCaseRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final ProblemRestrictionRepository problemRestrictionRepository;
    private final TestCaseRepository testCaseRepository;
    private final ProblemImageRepository problemImageRepository;
    private final ProblemMapper problemMapper;
    private final AwsS3Controller awsS3Controller;

    public ProblemDto getProblem(Long problemNo) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        if (problem == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 없음");
            return null;
        } else {
            if (!problem.isProblemResign()) {
                ProblemRestriction problemRestrictionEntity = problemRestrictionRepository.findByProblemNo(
                        problemNo);
                List<TestCase> testCaseEntityList = testCaseRepository.findByProblemNo(problemNo);
                List<ProblemImage> problemImageList = problemImageRepository.findByProblemNo(
                        problemNo);
                return problemMapper.mapIntoOneProblemDto(problem,
                        problemRestrictionEntity, testCaseEntityList, problemImageList, problemNo);
            } else {
                System.out.println("삭제된 문제");
                return null;
            }
        }
    }

    @Override
    public PublicProblemDto getProblemPublic(Long problemNo) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        if (problem == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 없음");
            return null;
        } else {
            if (!problem.isProblemResign()) {
                ProblemRestriction problemRestrictionEntity = problemRestrictionRepository.findByProblemNo(
                        problemNo);
                List<TestCase> testCaseEntityList = testCaseRepository.findByProblemNo(problemNo);
                List<ProblemImage> problemImageList = problemImageRepository.findByProblemNo(
                        problemNo);
                return problemMapper.mapIntoOnePublicProblemDto(problem,
                        problemRestrictionEntity, testCaseEntityList, problemImageList, problemNo);
            } else {
                System.out.println("삭제된 문제");
                return null;
            }
        }
    }


    @Transactional
    public void updateProblemCounts(Long problemNo, int correct) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        if (problem == null) {
            System.out.println("업데잇 핧 문제 부재");
        } else {
            problem.updateCounts(correct);
        }
    }

    @Override
    public Long getRandomProblem(RandomProblemDto randomProblemDto) {
        List<Long> problemNoList = problemRepository.getList(randomProblemDto.getProblemSource(),
                randomProblemDto.getProblemLevel());

        if (problemNoList == null || problemNoList.isEmpty()) {
            return null;
        }

        Random rand = new Random();
        return problemNoList.get(rand.nextInt(problemNoList.size()));
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
        saveTestCaseToS3(problemNo, getProblemDto);
        //문제 이미지 저장 필요. s3에 저장하고.
        saveImageToS3(problemNo, getProblemDto);
    }


    @Transactional
    public boolean deleteProblem(Long problemNo) {
        Problem problemEntity = problemRepository.findById(problemNo).orElse(null);
        if (problemEntity == null) {
            System.out.println("해당 problemNo에 대한 데이터가 없는 경우");
            return false;
        }
        problemRepository.updateProblemResign(problemNo);
        problemRestrictionRepository.updateProblemRestrictionResign(problemNo);
        testCaseRepository.updateTestCaseResign(problemNo);
        problemImageRepository.updateProblemImageResign(problemNo);

        return true;
    }

    @Transactional
    public void updateProblem(Long problemNo, GetProblemDto getProblemDto) {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        System.out.println(problem);
        if (problem == null) {
            //  해당 problemNo에 대한 데이터가 없는 경우
            System.out.println("그런 문제 이미 없음");
        } else {
            // DTO의 값을 엔티티에 복사
            problem.updateProblem(problemMapper.dtoToProblemEntity(
                    getProblemDto));
            ProblemRestriction problemRestrictionEntity = problemRestrictionRepository.findByProblemNo(
                    problemNo);
            problemRestrictionEntity.updateRestriction(
                    problemMapper.dtoToProblemRestrictionEntity(getProblemDto, problemNo));

        }
    }

    @Transactional
    public void updateProblemImage(Long problemNo, GetProblemDto getProblemDto) throws IOException {
        Problem problem = problemRepository.findById(problemNo).orElse(null);
        List<ProblemImage> problemImageList = problemImageRepository.findByProblemNo(problemNo);
        System.out.println(problemImageList);
        if (problemImageList.size() == 0) {
            System.out.println("no img");
        } else {
            //일단 지우고
            for (ProblemImage problemImage : problemImageList) {
                ProblemImageDto problemImageDto = problemMapper.convertEntityToDto(
                        problemImage);
                awsS3Controller.remove(problemImageDto.getProblemImageS3Url());
            }
            //디비도 날리고
            problemImageRepository.delete(problemNo);
            //다시 s3에 저장하고
            saveImageToS3(problemNo, getProblemDto);
            problem.updateContent(getProblemDto.getProblemContent());
        }
    }

    @Transactional
    public void updateTestCase(Long problemNo, GetProblemDto getProblemDto) throws IOException {
        List<TestCase> testCaseList = testCaseRepository.findByProblemNo(problemNo);
        System.out.println(testCaseList);
        if (testCaseList.size() == 0) {
            System.out.println("빔.");
        } else {
            //일단 지우고
            for (TestCase testCase : testCaseList) {
                TestCaseDto testCaseDto = problemMapper.convertEntityToDto(testCase);
                awsS3Controller.remove(testCaseDto.getTestCaseInput());
                awsS3Controller.remove(testCaseDto.getTestCaseOutput());
            }
            //디비도 날리고
            testCaseRepository.delete(problemNo);
            //다시 s3에 저장하고
            saveTestCaseToS3(problemNo, getProblemDto);
        }
    }

    public void saveTestCaseToS3(Long problemNo, GetProblemDto getProblemDto) throws IOException {
        System.out.println(getProblemDto.getTestCaseInputPublicList());
        //공개 테케
        for (int i = 0; i < getProblemDto.getTestCaseInputPublicList().size();
                i++) {
            String inputUrl = awsS3Controller.upload(
                    getProblemDto.getTestCaseInputPublicList().get(i));
            String outputUrl = awsS3Controller.upload(
                    getProblemDto.getTestCaseOutputPublicList().get(i));

            TestCaseDto testCaseDto = problemMapper.createTestCaseDto(problemNo, inputUrl,
                    outputUrl, true);
            TestCase testCase = problemMapper.dtoToTestCaseEntity(testCaseDto);
            testCaseRepository.save(testCase);
        }
        //비공개 테케
        for (int i = 0; i < getProblemDto.getTestCaseInputPrivateList().size();
                i++) {
            String inputUrl = awsS3Controller.upload(
                    getProblemDto.getTestCaseInputPrivateList().get(i));
            String outputUrl = awsS3Controller.upload(
                    getProblemDto.getTestCaseOutputPrivateList().get(i));
            TestCaseDto testCaseDto = problemMapper.createTestCaseDto(problemNo, inputUrl,
                    outputUrl, false);
            TestCase testCase = problemMapper.dtoToTestCaseEntity(testCaseDto);
            testCaseRepository.save(testCase);
        }
    }

    public void saveImageToS3(Long problemNo, GetProblemDto getProblemDto) throws IOException {
        for (int i = 0; i < getProblemDto.getProblemImageList().size(); i++) {
            //경로 받아서 (새로 들어온 dto 안 리스트의 길이만큼)
            String imgUrl = awsS3Controller.upload(getProblemDto.getProblemImageList().get(i));
            ProblemImageDto problemImageDto = problemMapper.createProblemImageDto(problemNo,
                    imgUrl);
            //등록하고
            ProblemImage problemImage = problemMapper.dtoToProblemImageEntity(problemImageDto,
                    problemNo);
            //db에 저장.
            problemImageRepository.save(problemImage);
        }
    }

    @Override
    public List<ProblemListDto> getList() {
        List<Problem> problemList = problemRepository.findAll();
        List<ProblemListDto> problemListDtoList = new ArrayList<>();
        for (Problem problem : problemList) {
            if (problem.isProblemResign()) {
                continue;
            }
            ProblemListDto problemListDto = problemMapper.convertEntityToDto(problem);
            problemListDtoList.add(problemListDto);

        }
        return problemListDtoList;
    }


}