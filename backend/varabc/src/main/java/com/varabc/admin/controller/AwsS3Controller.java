package com.varabc.admin.controller;

import com.varabc.admin.domain.dto.AwsS3;
import com.varabc.admin.service.AwsS3Service;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
public class AwsS3Controller {

    private final AwsS3Service awsS3Service;

    @PostMapping("/resource")
    public AwsS3 upload(@RequestPart("file") MultipartFile multipartFile) throws IOException {
        return awsS3Service.upload(multipartFile,"upload");
    }
    //데이터 crud
    //s3에 저장하고 경로들 rds에 저장하는 내용으로 구현.
    //admin에서 디비에 데이터 넣는 작업 필요.
    //problem은 디비에 접근해서 특정 문제들에 대한 정보들을 가져올 수 있도록.
        //이미지는 s3경로들을 가져올 수 있도록.
    @DeleteMapping("/resource")
    public void remove(AwsS3 awsS3) {
        awsS3Service.remove(awsS3);
    }
}