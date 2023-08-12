package com.varabc.mypage.service;

import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import java.util.List;
public interface MyPageService {

    List<MyPageReviewDto> getReviews(Long memberNo);

    List<BattleResultDto> getBattleList(Long memberNo);

    BattleResultDetailDto getBattleResult(Long battleNo, Long memberNo);
}
