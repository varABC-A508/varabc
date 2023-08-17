package com.varabc.member.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.varabc.jwt.service.JwtService;
import com.varabc.member.domain.dto.MemberDto;
import com.varabc.member.domain.dto.NicknameDto;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.service.GoogleLoginService;
import com.varabc.member.service.KakaoLoginService;
import com.varabc.member.service.MemberService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final GoogleLoginService googleLoginService;
    private final MemberService memberService;
    private final KakaoLoginService kakaoLoginService;
    private final JwtService jwtService;

    @GetMapping("googleLogin")
    public RedirectView loginGoogle(@RequestParam String code) {
        JsonNode jsonToken = googleLoginService.getAccessToken(code);
        String accessToken = jsonToken.get("access_token").toString();
        JsonNode userInfo = googleLoginService.getGoogleUserInfo(accessToken);
        Member member = memberService.saveGoogleMember(userInfo);
        RedirectView redirectView = new RedirectView("https://varabc.com/");

        //추후수정 필요
        try {
            String accessTokenForJwt = jwtService.createAccessToken("memberNo",
                    member.getMemberNo());
            System.out.println(accessTokenForJwt);
            String refreshTokenForJwt = jwtService.createRefreshToken("memberNo",
                    member.getMemberNo());
            System.out.println(refreshTokenForJwt);
            memberService.saveRefreshToken(member.getMemberNo(), refreshTokenForJwt);
            redirectView.addStaticAttribute("access-token", accessTokenForJwt);
            redirectView.addStaticAttribute("refresh-token", refreshTokenForJwt);
            System.out.println(member.getMemberNickname());
            redirectView.addStaticAttribute("memberNickname", member.getMemberNickname());
        } catch (Exception e) {
            redirectView.addStaticAttribute("errorMessage", e.getMessage());
        }
        System.out.println(redirectView);
        return redirectView;
    }

    @GetMapping("kakaoLogin")
    public RedirectView loginKakao(@RequestParam String code) {
        JsonNode jsonToken = kakaoLoginService.getAccessToken(code);
        System.out.println(jsonToken.toString());
        String accessToken = jsonToken.get("access_token").toString();
        JsonNode userInfo = kakaoLoginService.getKakaoUserInfo(accessToken);
        System.out.println(userInfo);
        Member member = memberService.saveKakaoMember(userInfo);
        RedirectView redirectView = new RedirectView("https://varabc.com/");

        try {
            String accessTokenForJwt = jwtService.createAccessToken("memberNo",
                    member.getMemberNo());
            System.out.println(accessTokenForJwt);
            String refreshTokenForJwt = jwtService.createRefreshToken("memberNo",
                    member.getMemberNo());
            System.out.println(refreshTokenForJwt);
            memberService.saveRefreshToken(member.getMemberNo(), refreshTokenForJwt);
            redirectView.addStaticAttribute("access-token", accessTokenForJwt);
            redirectView.addStaticAttribute("refresh-token", refreshTokenForJwt);
            System.out.println(member.getMemberNickname());
            redirectView.addStaticAttribute("memberNickname", member.getMemberNickname());
        } catch (Exception e) {
            redirectView.addStaticAttribute("errorMessage", e.getMessage());
        }
        System.out.println(redirectView);
        return redirectView;
    }

    @GetMapping("getUserInfo")
    public ResponseEntity<Object> getUserInfo(@RequestHeader("access-token") String accessToken) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        System.out.println(accessToken);
        try {
            if (!jwtService.checkToken(accessToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
            }
            long memberNo = jwtService.getMemberNoFromAccessToken(accessToken);
            MemberDto memberDto = memberService.getMemberByMemberNo(memberNo);
            if (memberDto.isMemberResign()) {
                resultMap.put("message", "resigned");
                status = HttpStatus.UNAUTHORIZED;
            } else {
                resultMap.put("message", "SUCCESS");
                resultMap.put("userInfo", memberDto);
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("changeNickname")
    public ResponseEntity<Object> changeNickname(@RequestBody NicknameDto nicknameDto,
            @RequestHeader(name = "access-token") String accessToken) {
        HttpStatus status = null;
        try {
            if (!jwtService.checkToken(accessToken)) {
                status = HttpStatus.UNAUTHORIZED;
                return ResponseEntity.status(status).body("invalid access token");
            }
            long memberNo = jwtService.getMemberNoFromAccessToken(accessToken);
            memberService.updateMemberNickname(nicknameDto.getMemberNickname(), memberNo);
            status = HttpStatus.OK;
            return ResponseEntity.status(status).body("nickname change success");
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            return ResponseEntity.status(status).body("nickname change fail");
        }
    }

    @PostMapping("checkNickname")
    public ResponseEntity<Object> checkNickname(@RequestBody NicknameDto nicknameDto) {
        if (memberService.findMemberNickname(nicknameDto.getMemberNickname())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("already exist nickname");
        }
        return ResponseEntity.status(HttpStatus.OK).body("valid nickname");
    }

    @GetMapping("/memberList/admin")
    public ResponseEntity<?> getAllMemberNickname() {
        List<MemberDto> memberDtoList = memberService.getMember();
        if (memberDtoList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(memberDtoList, HttpStatus.OK);
    }

    @PatchMapping("/delete/{memberNo}")
    public ResponseEntity<?> deleteMember(@PathVariable long memberNo) {
        boolean check = memberService.deleteMember(memberNo);
        if (check) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
}