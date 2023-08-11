package com.varabc.mypage.controller;

import com.varabc.mypage.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;
//
//    @GetMapping("/review/{memberNo}")
//    public ResponseEntity<?> getReviews(@PathVariable Long memberNo){
//       List<MyPageReviewDto> reviewList=  myPageService.getReviews(memberNo);
//        HttpStatus status;
//        return new ResponseEntity<>( HttpStatus.OK);
//
//    }


}
