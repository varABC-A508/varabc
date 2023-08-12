package com.varabc.mypage.controller;

import com.varabc.mypage.domain.dto.BattleResultDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.mypage.service.MyPageService;
import com.varabc.validation.Service.ValidationService;
import com.varabc.validation.domain.dto.SubmitDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;
    private final ValidationService validationService;

    @GetMapping("/review/{memberNo}")
    public ResponseEntity<?> getReviews(@PathVariable Long memberNo) {
        List<MyPageReviewDto> reviewList = myPageService.getReviews(memberNo);
        HttpStatus status;
        if (reviewList.size() == 0) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(reviewList, status);

    }

    @GetMapping("/submit/{memberNo}/{mode}")
    public ResponseEntity<?> getSubmits(@PathVariable Long memberNo, @PathVariable int mode) {
        List<MyPageSubmitDto> myPageSubmitList = validationService.getSubmits(memberNo, mode);
        HttpStatus status;
        if (myPageSubmitList.size() == 0) {
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(myPageSubmitList, status);
    }

    @GetMapping("/submit/code/{submitNo}")
    public ResponseEntity<?> getSubmitCode(@PathVariable Long submitNo) {
        SubmitDto submitDto = validationService.getSubmit(submitNo);
        if (submitDto == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(submitDto, HttpStatus.OK);


    }

    @GetMapping("/battle/{memberNo}")
    public ResponseEntity<?> getBattleList(@PathVariable Long memberNo) {

        List<BattleResultDto> battleResultDtoList = myPageService.getBattleList(memberNo);
        if (battleResultDtoList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(battleResultDtoList, HttpStatus.OK);
    }


}
