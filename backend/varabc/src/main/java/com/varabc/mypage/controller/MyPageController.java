package com.varabc.mypage.controller;

import com.varabc.member.domain.dto.MemberDto;
import com.varabc.member.service.MemberService;
import com.varabc.mypage.domain.dto.BattleListDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.mypage.domain.dto.ReviewBattleDetailDto;
import com.varabc.mypage.domain.dto.SubmitCodeDto;
import com.varabc.mypage.service.MyPageService;
import com.varabc.validation.Service.ValidationService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;
    private final ValidationService validationService;
    private final MemberService memberService;

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
        SubmitCodeDto submitCodeDto = myPageService.getSubmit(submitNo);
        if (submitCodeDto == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(submitCodeDto, HttpStatus.OK);


    }

    @GetMapping("/battle/{memberNo}")
    public ResponseEntity<?> getBattleList(@PathVariable Long memberNo) {

        List<BattleListDetailDto> battleResultDtoList = myPageService.getBattleList(memberNo);
        if (battleResultDtoList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(battleResultDtoList, HttpStatus.OK);
    }

    @GetMapping("/battleDetail/{competitionResultNo}/{memberNo}")
    public ResponseEntity<?> getBattleDetail(@PathVariable Long competitionResultNo,
            @PathVariable Long memberNo) {

        BattleResultDetailDto battleResultDetailDto = myPageService.getBattleDetail(
                competitionResultNo, memberNo);
        if (battleResultDetailDto == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        if (battleResultDetailDto.getMyTeamSubmitList().isEmpty()
                && battleResultDetailDto.getOpponentTeamSubmitList().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(battleResultDetailDto, HttpStatus.OK);
    }

    @GetMapping("/review/battleDetail/{competitionResultNo}/{memberNo}")
    public ResponseEntity<?> getReviewBattleDetail(@PathVariable Long competitionResultNo,
            @PathVariable Long memberNo) {

        ReviewBattleDetailDto reviewBattleDetailDto = myPageService.getReviewBattleDetail(
                competitionResultNo, memberNo);
        if (reviewBattleDetailDto == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reviewBattleDetailDto, HttpStatus.OK);
    }

    @GetMapping("/battle/{competitionResultNo}/{memberNo}")
    public ResponseEntity<?> getBattleReview(@PathVariable Long competitionResultNo,
            @PathVariable Long memberNo) {
        MyPageReviewDto myPageReviewDto = myPageService.getBattleReview(competitionResultNo,
                memberNo);
        if (myPageReviewDto == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myPageReviewDto, HttpStatus.OK);
    }


    @GetMapping("/{memberNo}")
    public ResponseEntity<?> getOtherMember(@PathVariable Long memberNo) {
        MemberDto memberDto = memberService.getMemberByMemberNo(memberNo);
        if (memberDto == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(memberDto, HttpStatus.OK);
    }

    @GetMapping("/{problemNo}/{memberNo}")
    public ResponseEntity<?> getMySubmit(@PathVariable Long memberNo,
            @PathVariable Long problemNo) {
        List<MyPageSubmitDto> myPageSubmitDtoList = myPageService.getSubmitList(memberNo,
                problemNo);
        if (myPageSubmitDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myPageSubmitDtoList, HttpStatus.OK);
    }

    @PatchMapping("/delete/{reviewNo}")
    public ResponseEntity<?> deleteReview(@PathVariable long reviewNo) {
        boolean check = myPageService.deleteReview(reviewNo);
        if (check) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

}