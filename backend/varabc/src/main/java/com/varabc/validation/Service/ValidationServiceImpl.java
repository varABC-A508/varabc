package com.varabc.validation.Service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.varabc.validation.domain.dto.TestCaseDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
import com.varabc.validation.domain.entity.TestCaseVal;
import com.varabc.validation.domain.util.FileData;
import com.varabc.validation.mapper.ValidationMapper;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ValidationServiceImpl implements ValidationService{

    private final RestTemplate restTemplate;
    private final ValidationRepository validationRepository;
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
        System.out.println(responseEntity.getBody());
        return responseEntity.getBody();
    }

    @Override
    public TestCaseDto getTestCaseDtoByProblemNo(long problemNo) {
        List<TestCaseVal> testCases = validationRepository.findByProblemNo(problemNo);
        List<String> inputFiles = testCases.stream()
                .map(TestCaseVal::getTestCaseInput)
                .collect(Collectors.toList());

        List<String> outputFiles = testCases.stream()
                .map(TestCaseVal::getTestCaseOutput)
                .collect(Collectors.toList());

        return ValidationMapper.testCaseListToDto(inputFiles, outputFiles);
    }

    //s3파일 경로를 받아서 리스트로 반환하기.
    @Override
    public List<FileData> getFiles(List<String> fileUrls)
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

}
