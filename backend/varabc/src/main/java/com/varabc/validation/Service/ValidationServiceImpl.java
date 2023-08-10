package com.varabc.validation.Service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.varabc.battle.domain.dto.ResultDto;
import com.varabc.battle.domain.dto.SubmitBattleDto;
import com.varabc.problem.domain.entity.ProblemRestriction;
import com.varabc.problem.domain.entity.TestCase;
import com.varabc.problem.repository.ProblemRestrictionRepository;
import com.varabc.problem.service.ProblemService;
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
public class ValidationServiceImpl implements ValidationService{

    private final RestTemplate restTemplate;
    private final ValidationRepository validationRepository;
    private final SubmitRepository submitRepository;
    private final ProblemRestrictionRepository problemRestrictionRepository;
    private final ValidationMapper validationMapper;
    private final ProblemService problemService;
    private final AmazonS3 amazonS3;

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

    //s3파일 경로를 받아서 리스트로 반환하기.
    @Override
    public List<FileData> getUrlIntoText(List<String> fileUrls)
            throws IOException {

        List<FileData> files= new ArrayList<FileData>();
        //인풋 아웃풋 받기
        for(int i=0; i<fileUrls.size();i++){
            String urlString = fileUrls.get(i);
            URL url = new URL(urlString);
            String host = url.getHost();
            String bucketName = host.substring(0, host.indexOf("."));
            String key = url.getPath().substring(1);  // remove the leading '/'

            S3Object s3Object = amazonS3.getObject(bucketName, key);
            S3ObjectInputStream objectData = s3Object.getObjectContent();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(objectData, StandardCharsets.UTF_8))) {
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append("\n");
                }
                FileData tempFileData= new FileData(sb.toString());
                files.add(tempFileData);
            }
        }
        return files;
    }

    @Override
    public void saveValidationResult(ValidationResultDto validationResultDto, ValidateDto validateDto, int mode) {
        //validationResultDto를 Submit엔티티로 변환
        Submit submit = validationMapper.mapDtoToSubmitEntity(validationResultDto,validateDto, mode);
        submitRepository.save(submit);
    }
    @Override
    public ProblemRestrictionDto getProblemRestriction(Long problemNo) {
        ProblemRestriction problemRestriction=problemRestrictionRepository.findByProblemNo(problemNo);
        return validationMapper.problemRestrictionToDto(problemRestriction);
    }

    @Override
    public ResultDto submitBattle(SubmitBattleDto submitBattleDto, Long competitionResultNo) throws IOException {
        String pythonServerUrl = "http://43.200.245.232:5000/";
        String javaServerUrl = "http://43.200.245.232:8081/";
        TestCaseDto testCaseDto= getTestCaseDtoByProblemNo(submitBattleDto.getProblemNo());
        //레포지토리에서 문제에 대한 제약사항들을 가져오는 로직 수행
        List<FileData> inputFiles= getUrlIntoText(testCaseDto.getInputFiles());
        List<FileData> outputFiles= getUrlIntoText(testCaseDto.getOutputFiles());


        ProblemRestrictionDto problemRestrictionDto = getProblemRestriction(submitBattleDto.getProblemNo());
        ValidateDto validateDto1=null;
        ValidateDto validateDto2=null;
        ValidationResultDto validationResultDto=null;
        validateDto1= validationMapper.mapToValidateDto(submitBattleDto,problemRestrictionDto,inputFiles,outputFiles,1);
        validateDto2= validationMapper.mapToValidateDto(submitBattleDto,problemRestrictionDto,inputFiles,outputFiles,2);
        if(submitBattleDto.getLanguage().equals("java")){
            validationResultDto=sendRequestValidation(javaServerUrl,validateDto1);
        }else{
            validationResultDto = sendRequestValidation(pythonServerUrl, validateDto1);

        }

        HttpStatus status=HttpStatus.OK;
        saveValidationResult(validationResultDto, validateDto1,2);
        saveValidationResult(validationResultDto, validateDto2,2);
        String resultMessage;
        String redirectUrl = "";
        //problemservice 접근해서 문제 정보 업데이트.
        if(validationResultDto.getResult()==1){
            //정답인 경우 correct도 올려야.
            resultMessage = "정답";
            redirectUrl = "/newPage";
            problemService.updateProblemCounts(validationResultDto.getProblemNo(),1);
        }else{
            resultMessage = switch (validationResultDto.getResult()) {
                case 2 -> "시간초과";
                case 3 -> "메모리초과";
                default-> "오답";
            };
            problemService.updateProblemCounts(validationResultDto.getProblemNo(),2);
        }
        return validationMapper.dtoToDto(validationResultDto,resultMessage,redirectUrl);
    }


}
