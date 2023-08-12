package com.varabc.mypage.service;

import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.battle.domain.entity.Review;
import com.varabc.battle.domain.entity.ReviewTag;
import com.varabc.battle.repository.CompetitionResultRepository;
import com.varabc.battle.repository.ReviewRepository;
import com.varabc.battle.repository.ReviewTagRepository;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.repository.MemberRepository;
import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.mypage.mapper.MyPageMapper;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.repository.ProblemRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    private final ReviewTagRepository reviewTagRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final ProblemRepository problemRepository;
    private final CompetitionResultRepository competitionResultRepository;
    private final MyPageMapper myPageMapper;

    @Override
    public List<MyPageReviewDto> getReviews(Long memberNo) {
        List<MyPageReviewDto> myPageReviewDtoList = new ArrayList<>();
        List<Review> reviewList = reviewRepository.findByReviewReceiveMemberNo(memberNo);
        System.out.println(reviewList);
        for (Review review : reviewList) {
            ReviewTag reviewTag = reviewTagRepository.findByReviewNo(review.getReviewNo());
            MyPageReviewDto myPageReviewDto = myPageMapper.EntityToDto(review, reviewTag);
            myPageReviewDtoList.add(myPageReviewDto);
        }

        return myPageReviewDtoList;
    }

    @Override
    public List<BattleResultDto> getBattleList(Long memberNo) {
        List<BattleResultDto> battleResultDtoList = new ArrayList<>();
        Member member = memberRepository.findByMemberNo(memberNo);

        List<CompetitionResult> competitionResultListT1 = competitionResultRepository.findByCompetitionResultT1M1NoOrCompetitionResultT1M2No(
                memberNo, memberNo);
        List<CompetitionResult> competitionResultListT2 = competitionResultRepository.findByCompetitionResultT2M1NoOrCompetitionResultT2M2No(
                memberNo, memberNo);

        for (CompetitionResult competitionResult : competitionResultListT1) {
            //competition_result_no를 submit에서 찾아서 problemNo만 가져오기
            Problem problem = problemRepository.findProblemsByCompetitionResultNo(
                    competitionResult.getCompetitionResultNo()).get(0);
            BattleResultDto battleResultDto = myPageMapper.EntityToDto(member, competitionResult,
                    problem, 1);
            battleResultDtoList.add(battleResultDto);
        }
        for (CompetitionResult competitionResult : competitionResultListT2) {
            Problem problem = problemRepository.findProblemsByCompetitionResultNo(
                    competitionResult.getCompetitionResultNo()).get(0);
            BattleResultDto battleResultDto = myPageMapper.EntityToDto(member, competitionResult,
                    problem, 2);
            battleResultDtoList.add(battleResultDto);
        }
        return battleResultDtoList;

    }

    @Override
    public BattleResultDetailDto getBattleResult(Long battleNo, Long memberNo) {
        List<BattleResultDto> myTeamSubmitList = new ArrayList<>();
        List<BattleResultDto> opponentTeamSubmitList = new ArrayList<>();

        return myPageMapper.EntityToDto(myTeamSubmitList, opponentTeamSubmitList);
    }
}
