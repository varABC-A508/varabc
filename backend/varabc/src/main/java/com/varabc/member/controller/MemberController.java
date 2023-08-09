package com.varabc.member.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.jwt.service.JwtService;
import com.varabc.member.domain.entity.Member;

import com.varabc.member.service.GoogleLoginService;
import com.varabc.member.service.KakaoLoginService;
import com.varabc.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final GoogleLoginService googleLoginService;
    private final MemberService memberService;
    private final KakaoLoginService kakaoLoginService;
    private final JwtService jwtService;

    @GetMapping("google-login")
    public ResponseEntity<Map<String, Object>> loginGoogle(@RequestParam String code){
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
//        System.out.println(userInfo.toString());

//        return ResponseEntity.ok(memberService.saveGoogleMember(userInfo));

        ////
//        System.out.println("userInfo : " + userInfo);
        Member member = memberService.saveGoogleMember(userInfo);

        Map<String, Object> resultMap= new HashMap<>();
        HttpStatus status=null;
        try{
            //고유식별자로 토큰 발급
            String accessTokenForJwt=jwtService.createAccessToken("memberNo", member.getMemberNo());
            System.out.println(accessTokenForJwt);
            String refreshTokenForJwt=jwtService.createRefreshToken("memberNo", member.getMemberNo());
            System.out.println(refreshTokenForJwt);
            memberService.saveRefreshToken(member.getMemberNo(), refreshTokenForJwt);
            //for debug
            resultMap.put("message", "SUCCESS");
            resultMap.put("access-token",accessTokenForJwt);
            resultMap.put("refresh-token",refreshTokenForJwt);
            status=HttpStatus.ACCEPTED;
        }catch(Exception e){
            resultMap.put("message", e.getMessage());
            status=HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
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
