package com.varabc.member.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.member.domain.dto.LoginResponseDto;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.repository.MemberRepository;
import java.util.Arrays;

import com.varabc.member.service.GoogleLoginService;
import com.varabc.member.service.KakaoLoginService;
import com.varabc.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final GoogleLoginService googleLoginService;
    private final MemberService memberService;
    private final KakaoLoginService kakaoLoginService;

    @GetMapping("google-login")
    public ResponseEntity<Object> loginGoogle(@RequestParam String code){
        // Access Token 발급
        JsonNode jsonToken = googleLoginService.getAccessToken(code);
//        System.out.println(jsonToken.toString());
        String accessToken = jsonToken.get("access_token").toString();
        String refreshToken = "";
        if(jsonToken.has("refresh_token")) {
            refreshToken = jsonToken.get("refresh_token").toString();
        }
        String expiresTime = jsonToken.get("expires_in").toString();
        // Access Token으로 사용자 정보 반환
        JsonNode userInfo = googleLoginService.getGoogleUserInfo(accessToken);
        System.out.println(userInfo.toString());

        return ResponseEntity.ok(memberService.saveGoogleMember(userInfo));
    }

    @GetMapping("kakao-login")
    public ResponseEntity<Object> loginKakao(@RequestParam String code){
        // Access Token 발급
        JsonNode jsonToken = kakaoLoginService.getAccessToken(code);
        System.out.println(jsonToken.toString());
        String accessToken = jsonToken.get("access_token").toString();
        String refreshToken = "";
        if(jsonToken.has("refresh_token")) {
            refreshToken = jsonToken.get("refresh_token").toString();
        }
        String expiresTime = jsonToken.get("expires_in").toString();
        // Access Token으로 사용자 정보 반환
        JsonNode userInfo = kakaoLoginService.getKakaoUserInfo(accessToken);
        System.out.println(userInfo.toString());
        return ResponseEntity.ok(userInfo);
    }
}
