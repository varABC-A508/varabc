package com.varabc.validation.controller;

import com.varabc.validation.Service.ValidationService;
import com.varabc.validation.domain.dto.ValidateDataDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/validation")
@RequiredArgsConstructor
public class ValidationController {
    //일단 파이썬 채점에 필요한 여건들부터 차례대로 확인해보자.
    //클라이언트에서 코드와 기타등등을 전달받았다고 가정하고,
    //해당 요청을 현재 로컬서버의 파이썬 채점서버에 전달해서 채점 결과를 받아오는
    //api를 먼저 작성해보자.
    private final ValidationService validationService;


    //파이썬 서버로 요청 보내기
    @PostMapping("sendvalidatepy")
    public ResponseEntity<ValidationResultDto> validatePy(@RequestBody ValidateDataDto ValidateDataDto) throws Exception{
        //DB에서 엔티티를 꺼내와서  ValidationResult ValidateDto의 값을 온전하게 세팅하여 전달함,
        ValidateDto validateDto= new ValidateDto();
        // 파이썬 서버로 요청 보내기
        ValidationResultDto validationResultDto= new ValidationResultDto();
        HttpStatus status=HttpStatus.OK;

        //service단에서 파이썬 서버로 요청을 보내고 그에 대한 응답을 받게끔 처리
        String pythonServerUrl = "http://localhost:5000/";
        validationResultDto=validationService.sendRequestValidation(pythonServerUrl,validateDto);


        return new ResponseEntity<ValidationResultDto>(validationResultDto, status);
    }

}
