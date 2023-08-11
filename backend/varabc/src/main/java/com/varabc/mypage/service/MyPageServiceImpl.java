package com.varabc.mypage.service;

import com.varabc.battle.domain.entity.Review;
import com.varabc.battle.repository.ReviewRepository;
import com.varabc.battle.repository.ReviewTagRepository;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

//    private final ReviewTagRepository reviewTagRepository;
//    private final ReviewRepository reviewRepository;
//    @Override
//    public List<MyPageReviewDto> getReviews(Long memberNo) {
//        //
//        List<Review> reviewList = reviewRepository.findByReviewReceiveMemberNo(memberNo);
////        List<ReviewTag> reviewTagList = reviewTagRepository.findByReviewNo()
//        return null;
//    }
}
