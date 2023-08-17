package com.varabc.mypage.service;

import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.battle.domain.entity.Review;
import com.varabc.battle.domain.entity.ReviewTag;
import com.varabc.battle.repository.CompetitionResultRepository;
import com.varabc.battle.repository.ReviewRepository;
import com.varabc.battle.repository.ReviewTagRepository;
import com.varabc.member.domain.entity.Member;
import com.varabc.member.repository.MemberRepository;
import com.varabc.mypage.domain.dto.BattleListDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.mypage.domain.dto.ReviewBattleDetailDto;
import com.varabc.mypage.domain.dto.SubmitCodeDto;
import com.varabc.mypage.mapper.MyPageMapper;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.problem.repository.ProblemRepository;
import com.varabc.validation.domain.entity.Submit;
import com.varabc.validation.repository.SubmitRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
    private final SubmitRepository submitRepository;
    private final MyPageMapper myPageMapper;

    @Override
    public List<MyPageReviewDto> getReviews(Long memberNo) {
        List<MyPageReviewDto> myPageReviewDtoList = new ArrayList<>();
        List<Review> reviewList = reviewRepository.findByReviewReceiveMemberNo(memberNo);
        Collections.sort(reviewList, Comparator.comparingLong(Review::getReviewNo).reversed());

        System.out.println(reviewList);
        for (Review review : reviewList) {
            if (review.isReviewResign()) {
                continue;
            }
            ReviewTag reviewTag = reviewTagRepository.findByReviewNo(review.getReviewNo());
            MyPageReviewDto myPageReviewDto = myPageMapper.EntityToDto(review, reviewTag);
            myPageReviewDtoList.add(myPageReviewDto);
        }

        return myPageReviewDtoList;
    }

    @Override
    public List<BattleListDetailDto> getBattleList(Long memberNo) {
        List<BattleListDetailDto> battleListDetailDtoList = new ArrayList<>();
        List<CompetitionResult> competitionResultList = competitionResultRepository.findByCompetitionResultT1M1NoOrCompetitionResultT1M2NoOrCompetitionResultT2M1NoOrCompetitionResultT2M2No(
                memberNo, memberNo, memberNo, memberNo);
        //역정렬 로직
        Collections.sort(competitionResultList, Comparator.comparingLong(CompetitionResult::getCompetitionResultNo).reversed());

        for (CompetitionResult competitionResult : competitionResultList) {
            if (competitionResult.isCompetitionResultResign()) {
                continue;
            }
            Member member1 = memberRepository.findByMemberNo(
                    competitionResult.getCompetitionResultT1M1No());
            Member member2 = memberRepository.findByMemberNo(
                    competitionResult.getCompetitionResultT1M2No());
            Member member3 = memberRepository.findByMemberNo(
                    competitionResult.getCompetitionResultT2M1No());
            Member member4 = memberRepository.findByMemberNo(
                    competitionResult.getCompetitionResultT2M2No());
            List<Problem> problemlist = problemRepository.findProblemsByCompetitionResultNo(
                    competitionResult.getCompetitionResultNo());

            if (problemlist.isEmpty()) {
                continue;
            }
            Problem problem = problemlist.get(0);
            int team = 2;
            if (memberNo == member1.getMemberNo() || memberNo == member2.getMemberNo()) {
                team = 1;
            }
            boolean isWinner = false;
            if (team == competitionResult.getCompetitionResultRecord()) {
                isWinner = true;
            }
            BattleListDetailDto battleListDetailDto = myPageMapper.EntityToDto(competitionResult,
                    problem, member1, member2, member3, member4, isWinner);
            battleListDetailDtoList.add(battleListDetailDto);
        }

        return battleListDetailDtoList;

    }

    @Override
    public BattleResultDetailDto getBattleDetail(Long competitionResultNo, Long memberNo
    ) {
        CompetitionResult competitionResult = competitionResultRepository.findByCompetitionResultNo(
                competitionResultNo);
        if (competitionResult.isCompetitionResultResign()) {
            return null;
        }
        int team = 2;
        if (memberNo.equals(competitionResult.getCompetitionResultT1M1No()) || memberNo.equals(
                competitionResult.getCompetitionResultT1M2No())) {
            team = 1;
        }
        List<MyPageSubmitDto> submitList1 = new ArrayList<>();
        List<MyPageSubmitDto> submitList2 = new ArrayList<>();
        List<Submit> submitList = submitRepository.findByCompetitionResultNoAndSubmitModeAndSubmitOrder(
                competitionResult.getCompetitionResultNo(), 2, 1);

        for (Submit submit : submitList) {
            Member member = memberRepository.findByMemberNo(submit.getMemberNo());
            String submitStatus = "틀렸습니다.";
            if (submit.getSubmitStatus() == 1) {
                submitStatus = "맞았습니다.";
            }
            MyPageSubmitDto myPageSubmitDto = myPageMapper.EntityToDto(member, submit,
                    submitStatus);
            if (submit.getMemberNo() == competitionResult.getCompetitionResultT1M1No()
                    || submit.getMemberNo() == competitionResult.getCompetitionResultT1M2No()) {
                submitList1.add(myPageSubmitDto);
            } else {
                submitList2.add(myPageSubmitDto);
            }
        }
        if (team == 1) {
            return myPageMapper.EntityToDto(submitList1, submitList2);
        } else {
            return myPageMapper.EntityToDto(submitList2, submitList1);
        }
    }

    @Override
    public MyPageReviewDto getBattleReview(Long competitionResultNo, Long memberNo) {
        Review review = reviewRepository.findByReviewReceiveMemberNoAndCompetitionResultNo(memberNo,
                competitionResultNo);
        if (review == null || review.isReviewResign()) {
            return null;
        }

        ReviewTag reviewTag = reviewTagRepository.findByReviewNo(review.getReviewNo());
        return myPageMapper.EntityToDto(review, reviewTag);
    }

    @Override
    public List<MyPageSubmitDto> getSubmitList(Long memberNo, Long problemNo) {
        List<MyPageSubmitDto> myPageSubmitDtoList = new ArrayList<>();
        List<Submit> submitList = submitRepository.findByMemberNoAndProblemNo(memberNo, problemNo);
        String submitStatus = "틀렸습니다.";
        for (Submit submit : submitList) {
            if (submit.getSubmitStatus() == 1) {
//                채점 현황. 1이 정답, 2가  시간초과, 3이 메모리 초과, 4가 오답.
                submitStatus = "맞았습니다.";
            }
            Problem problem = problemRepository.findByProblemNo(submit.getProblemNo());
            MyPageSubmitDto myPageSubmitDto = myPageMapper.EntityToDto(submit, submitStatus,
                    problem.getProblemTitle());
            myPageSubmitDtoList.add(myPageSubmitDto);
        }
        return myPageSubmitDtoList;
    }

    @Override
    public SubmitCodeDto getSubmit(Long submitNo) {
        Submit submit = submitRepository.findBySubmitNo(submitNo);
        Member member = memberRepository.findByMemberNo(submit.getMemberNo());
        Problem problem = problemRepository.findByProblemNo(submit.getProblemNo());
        return myPageMapper.EntityToDto(submit, member, problem);
    }

    @Override
    public ReviewBattleDetailDto getReviewBattleDetail(Long competitionResultNo, Long memberNo) {
        CompetitionResult competitionResult = competitionResultRepository.findByCompetitionResultNo(
                competitionResultNo);
        List<Problem> problemList = problemRepository.findProblemsByCompetitionResultNo(
                competitionResultNo);
        if (problemList.size() == 0) {
            return null;
        }
        if (competitionResult.isCompetitionResultResign()) {
            return null;
        }
        Problem problem = problemList.get(0);
        Member member1 = memberRepository.findByMemberNo(
                competitionResult.getCompetitionResultT1M1No());
        Member member2 = memberRepository.findByMemberNo(
                competitionResult.getCompetitionResultT1M2No());
        Member member3 = memberRepository.findByMemberNo(
                competitionResult.getCompetitionResultT2M1No());
        Member member4 = memberRepository.findByMemberNo(
                competitionResult.getCompetitionResultT2M2No());
        int team = 2;
        if (memberNo == member1.getMemberNo() || memberNo == member2.getMemberNo()) {
            team = 1;
        }
        boolean isWinner = false;
        if (team == competitionResult.getCompetitionResultRecord()) {
            isWinner = true;
        }
        ReviewBattleDetailDto reviewBattleDetailDto = myPageMapper.EntityToReviewBattleDetailDto(
                competitionResult,
                problem, member1, member2, member3, member4, isWinner);
        return reviewBattleDetailDto;
    }

    @Override
    @Transactional
    public boolean deleteReview(long reviewNo) {
        Review review = reviewRepository.findByReviewNo(reviewNo);
        review.updateReviewResign(true);
        ReviewTag reviewTag = reviewTagRepository.findByReviewNo(reviewNo);
        reviewTag.updateReviewTagResign(true);
        return true;
    }
}