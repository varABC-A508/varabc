package com.varabc.validation.controller;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.varabc.validation.Service.ValidationService;
import com.varabc.validation.domain.dto.TestCaseDto;
import com.varabc.validation.domain.dto.ValidateDataDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
import com.varabc.validation.domain.util.FileData;
import com.varabc.validation.mapper.ValidationMapper;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;


@RestController
@RequestMapping("/validation")
@RequiredArgsConstructor
@Component // Add this annotation to register the class as a Spring bean
public class ValidationController {
    //일단 파이썬 채점에 필요한 여건들부터 차례대로 확인해보자.
    //클라이언트에서 코드와 기타등등을 전달받았다고 가정하고,
    //해당 요청을 현재 로컬서버의 파이썬 채점서버에 전달해서 채점 결과를 받아오는
    //api를 먼저 작성해보자.
    private final ValidationService validationService;
    private final ValidationMapper validationMapper;
    private final AmazonS3 amazonS3;
    private static final Region region = Region.AP_NORTHEAST_2;


    //파이썬 서버로 요청 보내기
    @PostMapping("sendvalidatepy")
    public ResponseEntity<ValidationResultDto> validatePy(@RequestBody ValidateDataDto validateDataDto) throws Exception{
        //DB에서 엔티티를 꺼내와서  ValidationResult ValidateDto의 값을 온전하게 세팅하여 전달함,
        //레포지토리에서 테스트케이스들을 가져오는 로직 수행
        TestCaseDto testCaseDto= validationService.getTestCaseDtoByProblemNo(validateDataDto.getProblemNo());
        int len= testCaseDto.getInputFiles().size();
        List<FileData> inputFiles= new ArrayList<FileData>();
        //인풋 아웃풋 받기
        for(int i=0; i<len;i++){
            String urlString = testCaseDto.getInputFiles().get(i);
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
                inputFiles.add(tempFileData);
            }
        }

        List<FileData> outputFiles= new ArrayList<FileData>();
        for(int i=0; i<len;i++){
            String outurlString = testCaseDto.getOutputFiles().get(i);
            URL outurl = new URL(outurlString);
            String host = outurl.getHost();
            String bucketName = host.substring(0, host.indexOf("."));
            String key = outurl.getPath().substring(1);  // remove the leading '/'

            S3Object s3Object = amazonS3.getObject(bucketName, key);
            S3ObjectInputStream objectData = s3Object.getObjectContent();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(objectData, StandardCharsets.UTF_8))) {
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append("\n");
                }
                FileData tempFileData= new FileData(sb.toString());
                outputFiles.add(tempFileData);
            }
        }
        //dto를 완성함
        for(int i=0;i<inputFiles.size();i++){
            System.out.println(inputFiles.get(i).getContent());
            System.out.println(outputFiles.get(i).getContent());
        }
        ValidateDto validateDto= validationMapper.mapToValidateDto(validateDataDto,inputFiles,outputFiles);
        //파이썬 서버로 요청 보내기
        System.out.println(validateDto);
        ValidationResultDto validationResultDto = new ValidationResultDto();
        HttpStatus status=HttpStatus.OK;

        //service단에서 파이썬 서버로 요청을 보내고 그에 대한 응답을 받게끔 처리
        String pythonServerUrl = "http://localhost:5000/";
        validationResultDto =validationService.sendRequestValidation(pythonServerUrl,validateDto);


        return new ResponseEntity<ValidationResultDto>(validationResultDto, status);
    }

}
