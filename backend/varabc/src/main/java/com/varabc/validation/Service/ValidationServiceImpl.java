package com.varabc.validation.Service;


import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
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
}
