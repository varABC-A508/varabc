package com.varabc.validation.Service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.varabc.battle.domain.dto.BattleMemberDto;
import com.varabc.battle.domain.dto.FinalResultDto;
import com.varabc.battle.domain.dto.FinalResultListDto;
import com.varabc.battle.domain.dto.ResultDto;
import com.varabc.battle.domain.dto.SubmitBattleDto;
import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.repository.MemberRepository;
import com.varabc.member.service.MemberService;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import com.varabc.problem.repository.ProblemRepository;
import com.varabc.problem.repository.ProblemRestrictionRepository;
import com.varabc.problem.service.ProblemService;
import com.varabc.validation.domain.dto.CompileResultDto;
import com.varabc.validation.domain.dto.ProblemRestrictionDto;
import com.varabc.validation.domain.dto.TestCaseDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
import com.varabc.validation.domain.entity.Submit;
import com.varabc.validation.domain.util.FileData;
import com.varabc.validation.mapper.ValidationMapper;
import com.varabc.validation.repository.SubmitRepository;
import com.varabc.validation.repository.ValidationRepository;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ValidationServiceImpl implements ValidationService {

    private final RestTemplate restTemplate;
    private final ValidationRepository validationRepository;
    private final SubmitRepository submitRepository;
    private final ProblemRestrictionRepository problemRestrictionRepository;
    private final ProblemRepository problemRepository;
    private final MemberRepository memberRepository;
    private final ValidationMapper validationMapper;
    private final ProblemService problemService;
    private final MemberService memberService;
    private final AmazonS3 amazonS3;

    @Override
    public CompileResultDto sendRequestCompile(String serverUrl, ValidateDto validateDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<ValidateDto> requestEntity = new HttpEntity<>(validateDto, headers);

        // 채점 서버로 HTTP POST 요청을 보내고 응답을 받음
        ResponseEntity<CompileResultDto> responseEntity = restTemplate.exchange(
                serverUrl + "/compile",  // 채점 서버의 URL
                HttpMethod.POST,            // POST 요청
                requestEntity,              // 요청 데이터
                CompileResultDto.class   // 응답 데이터 타입
        );
        // 채점 서버로부터 받은 응답 결과 반환
        return responseEntity.getBody();
    }



    @Override
    public ValidationResultDto sendRequestValidation(String serverUrl, ValidateDto validateDto) {
        //채점 서버로 해당 dto를 넘겨줌
//        System.out.println(validateDto.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<ValidateDto> requestEntity = new HttpEntity<>(validateDto, headers);

        // 채점 서버로 HTTP POST 요청을 보내고 응답을 받음
        ResponseEntity<ValidationResultDto> responseEntity = restTemplate.exchange(
                serverUrl + "/evaluate",  // 채점 서버의 URL
                HttpMethod.POST,            // POST 요청
                requestEntity,              // 요청 데이터
                ValidationResultDto.class   // 응답 데이터 타입
        );

        // 채점 서버로부터 받은 응답 결과 반환
        return responseEntity.getBody();
    }

    @Override
    public TestCaseDto getTestCaseDtoByProblemNo(Long problemNo) {
        List<TestCase> testCases = validationRepository.findByProblemNo(problemNo);
        List<String> inputFiles = testCases.stream()
                .map(TestCase::getTestCaseInput)
                .collect(Collectors.toList());

        List<String> outputFiles = testCases.stream()
                .map(TestCase::getTestCaseOutput)
                .collect(Collectors.toList());

        return validationMapper.testCaseListToDto(inputFiles, outputFiles);
    }

    @Override
    public TestCaseDto getPublicTestCaseDtoByProblemNo(long problemNo) {
        List<TestCase> testCases = validationRepository.findByProblemNoAndTestCasePublic(problemNo,true);
        List<String> inputFiles = testCases.stream()
                .map(TestCase::getTestCaseInput)
                .collect(Collectors.toList());

        List<String> outputFiles = testCases.stream()
                .map(TestCase::getTestCaseOutput)
                .collect(Collectors.toList());

        return validationMapper.testCaseListToDto(inputFiles, outputFiles);
    }

    //s3파일 경로를 받아서 리스트로 반환하기.
    @Override
    public List<FileData> getUrlIntoText(List<String> fileUrls)
            throws IOException {

        List<FileData> files = new ArrayList<FileData>();
        //인풋 아웃풋 받기
        for (int i = 0; i < fileUrls.size(); i++) {
            String urlString = fileUrls.get(i);
            URL url = new URL(urlString);
            String host = url.getHost();
            String bucketName = host.substring(0, host.indexOf("."));
            String key = url.getPath().substring(1);  // remove the leading '/'

            S3Object s3Object = amazonS3.getObject(bucketName, key);
            S3ObjectInputStream objectData = s3Object.getObjectContent();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(objectData, StandardCharsets.UTF_8))) {
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append("\n");
                }
                FileData tempFileData = new FileData(sb.toString());
                files.add(tempFileData);
            }
        }
        return files;
    }

    @Override
    public void saveValidationResult(ValidationResultDto validationResultDto,
            ValidateDto validateDto, int mode,
            Long competitionResultNo, int order) {
        //validationResultDto를 Submit엔티티로 변환
        Submit submit = validationMapper.mapDtoToSubmitEntity(validationResultDto, validateDto,
                mode, competitionResultNo, order);
        submitRepository.save(submit);
    }

    @Override
    public ProblemRestrictionDto getProblemRestriction(Long problemNo) {
        ProblemRestriction problemRestriction = problemRestrictionRepository.findByProblemNo(
                problemNo);
        return validationMapper.problemRestrictionToDto(problemRestriction);
    }

    @Override
    public ResultDto submitBattle(SubmitBattleDto submitBattleDto, Long competitionResultNo,
            Long memberNo) throws IOException {
        String pythonServerUrl = "http://varabc.com:5000/";
        String javaServerUrl = "http://varabc.com:8081/";
        TestCaseDto testCaseDto = getTestCaseDtoByProblemNo(submitBattleDto.getProblemNo());
        //레포지토리에서 문제에 대한 제약사항들을 가져오는 로직 수행
        List<FileData> inputFiles = getUrlIntoText(testCaseDto.getInputFiles());
        List<FileData> outputFiles = getUrlIntoText(testCaseDto.getOutputFiles());

        ProblemRestrictionDto problemRestrictionDto = getProblemRestriction(
                submitBattleDto.getProblemNo());
        ValidateDto validateDto1 = null;
        ValidateDto validateDto2 = null;
        ValidationResultDto validationResultDto = null;
        validateDto1 = validationMapper.mapToValidateDto(submitBattleDto, problemRestrictionDto,
                inputFiles, outputFiles, 1);
        validateDto2 = validationMapper.mapToValidateDto(submitBattleDto, problemRestrictionDto,
                inputFiles, outputFiles, 2);
        if (submitBattleDto.getLanguage().equals("java")) {
            validationResultDto = sendRequestValidation(javaServerUrl, validateDto1);
        } else {
            validationResultDto = sendRequestValidation(pythonServerUrl, validateDto1);

        }

        HttpStatus status = HttpStatus.OK;
        if (memberNo == validateDto1.getMemberNo()) {
            saveValidationResult(validationResultDto, validateDto1, 2, competitionResultNo, 1);
            saveValidationResult(validationResultDto, validateDto2, 2, competitionResultNo, 2);
        } else {
            saveValidationResult(validationResultDto, validateDto2, 2, competitionResultNo, 1);
            saveValidationResult(validationResultDto, validateDto1, 2, competitionResultNo, 2);
        }

        String resultMessage;
        String redirectUrl = "";
        //problemservice 접근해서 문제 정보 업데이트.
        if (validationResultDto.getResult() == 1) {
            //정답인 경우 correct도 올려야.
            resultMessage = "정답";
            redirectUrl = "/newPage";
            problemService.updateProblemCounts(validationResultDto.getProblemNo(), 1);
        } else {
            resultMessage = switch (validationResultDto.getResult()) {
                case 2 -> "시간초과";
                case 3 -> "메모리초과";
                default -> "오답";
            };
            problemService.updateProblemCounts(validationResultDto.getProblemNo(), 2);
        }
        return validationMapper.dtoToDto(validationResultDto, resultMessage, redirectUrl);
    }

    @Override
    public FinalResultListDto getFinalResult(Long competitionResultNo,
            BattleMemberDto battleMemberDto) {
        FinalResultListDto finalResultListDto = null;
        //팀 정보에 따라 조회해서 각 디티오에 담아 다른 ㅅ리트스에 넣어 리턴.
        List<FinalResultDto> winnerList = new ArrayList<>();
        List<FinalResultDto> loserList = new ArrayList<>();
        //팀 분류 정보 가지고 들어와야. 쿼리문으로 날려야한다.
        List<Submit> submitList1 = null;
        List<Submit> submitList2 = null;

        if (battleMemberDto.getWinnerTeam() == 1) {
            submitList1 = submitRepository.getBattleList(competitionResultNo,
                    battleMemberDto.getCompetitionResultT1M1No(),
                    battleMemberDto.getCompetitionResultT1M2No());
            submitList2 = submitRepository.getBattleList(competitionResultNo,
                    battleMemberDto.getCompetitionResultT2M1No(),
                    battleMemberDto.getCompetitionResultT2M2No());
        } else {
            submitList1 = submitRepository.getBattleList(competitionResultNo,
                    battleMemberDto.getCompetitionResultT1M1No(),
                    battleMemberDto.getCompetitionResultT1M2No());
            submitList2 = submitRepository.getBattleList(competitionResultNo,
                    battleMemberDto.getCompetitionResultT2M1No(),
                    battleMemberDto.getCompetitionResultT2M2No());
        }
        Collections.sort(submitList1, Comparator.comparingLong(Submit::getSubmitNo).reversed());
        Collections.sort(submitList2, Comparator.comparingLong(Submit::getSubmitNo).reversed());

        for (Submit submit : submitList1) {
            String nickname = memberService.getMemberByMemberNo(submit.getMemberNo()).getMemberNickname();
            String submitStatus;
            if (submit.getSubmitStatus() == 1) {
//                채점 현황. 1이 정답, 2가  시간초과, 3이 메모리 초과, 4가 오답.
                submitStatus = "맞았습니다.";
            } else {
                submitStatus = "틀렸습니다.";
            }
            winnerList.add(validationMapper.EntityToDto(submit, nickname, submitStatus));

        }
        for (Submit submit : submitList2) {
            String nickname =  memberService.getMemberByMemberNo(submit.getMemberNo()).getMemberNickname();
            String submitStatus;
            if (submit.getSubmitStatus() == 1) {
//                채점 현황. 1이 정답, 2가  시간초과, 3이 메모리 초과, 4가 오답.
                submitStatus = "맞았습니다.";
            } else {
                submitStatus = "틀렸습니다.";
            }
            loserList.add(validationMapper.EntityToDto(submit, nickname, submitStatus));

        }
        finalResultListDto = validationMapper.dtoToDto(winnerList, loserList);
        return finalResultListDto;
    }



    @Override
    public List<MyPageSubmitDto> getSubmits(Long memberNo, int mode) {
        List<MyPageSubmitDto> myPageSubmitDtoList = new ArrayList<>();
        List<Submit> submitList = submitRepository.findByMemberNoAndSubmitMode(memberNo, mode);
        Collections.sort(submitList, Comparator.comparingLong(Submit::getSubmitNo).reversed());
        Member member = memberRepository.findByMemberNo(memberNo);
        for (Submit submit : submitList) {
            String submitStatus = "틀렸습니다.";
            if (submit.getSubmitStatus() == 1) {
//                채점 현황. 1이 정답, 2가  시간초과, 3이 메모리 초과, 4가 오답.
                submitStatus = "맞았습니다.";
            }
            Problem problem = problemRepository.findByProblemNo(submit.getProblemNo());
            MyPageSubmitDto myPageSubmitDto = validationMapper.EntityToDto(submit, submitStatus,problem,member);
            myPageSubmitDtoList.add(myPageSubmitDto);
        }
        return myPageSubmitDtoList;
    }

}