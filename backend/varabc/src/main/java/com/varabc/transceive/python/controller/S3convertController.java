//package com.varabc.transceive.python.controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import software.amazon.awssdk.services.s3.S3Client;
//import software.amazon.awssdk.services.s3.model.GetObjectRequest;
//import software.amazon.awssdk.core.sync.ResponseTransformer;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//
//@RestController
//public class S3convertController {
//    private S3Client s3Client = S3Client.create();
//    private ObjectMapper mapper = new ObjectMapper();
//
//    @GetMapping("/convert")
//    public String convertTextToJson(@RequestParam String bucketName, @RequestParam String key) throws IOException {
//        // S3에서 텍스트 파일 읽기
//        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
//                .bucket(bucketName)
//                .key(key)
//                .build();
//        String textContent = s3Client.getObject(getObjectRequest, ResponseTransformer.toBytes()).asUtf8String();
//
//        // 텍스트를 JSON으로 변환
//        // 이 예제에서는 단순하게 모든 텍스트를 하나의 JSON 객체의 'content' 필드에 저장하였습니다.
//        // 실제로는 이 부분을 텍스트의 형식에 맞게 적절하게 수정해야 할 것입니다.
//        Map<String, String> map = new HashMap<>();
//        map.put("content", textContent);
//        return mapper.writeValueAsString(map);
//}}

