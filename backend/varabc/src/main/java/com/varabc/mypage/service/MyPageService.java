package com.varabc.mypage.service;

import com.varabc.mypage.domain.dto.BattleListDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.mypage.domain.dto.ReviewBattleDetailDto;
import com.varabc.mypage.domain.dto.SubmitCodeDto;
import java.util.List;
public interface MyPageService {

    List<MyPageReviewDto> getReviews(Long memberNo);

    List<BattleListDetailDto> getBattleList(Long memberNo);

    BattleResultDetailDto getBattleDetail(Long competitionResultNo, Long memberNo);

    MyPageReviewDto getBattleReview(Long competitionResultNo, Long memberNo);

    List<MyPageSubmitDto> getSubmitList(Long memberNo, Long problemNo);

    SubmitCodeDto getSubmit(Long submitNo);

    ReviewBattleDetailDto getReviewBattleDetail(Long competitionResultNo, Long memberNo);

    boolean deleteReview(long reviewNo);
}
