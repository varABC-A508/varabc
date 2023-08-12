package com.varabc.mypage.mapper;

import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.battle.domain.entity.Review;
import com.varabc.battle.domain.entity.ReviewTag;
import com.varabc.member.domain.entity.Member;
import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.problem.domain.entity.Problem;
import java.util.List;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public class MyPageMapper {

    public MyPageReviewDto EntityToDto(Review review, ReviewTag reviewTag) {
        return MyPageReviewDto.builder()
                .reviewContent(review.getReviewContent())
                .reviewSendMemberNo(review.getReviewSendMemberNo())
                .reviewReceiveMemberNo(review.getReviewReceiveMemberNo())
                .reviewTagNaming(reviewTag.isReviewTagNaming())
                .reviewTagSpeed(reviewTag.isReviewTagSpeed())
                .reviewTagReadability(reviewTag.isReviewTagReadability())
                .reviewTagCommunication(reviewTag.isReviewTagCommunication())
                .build();
    }

    public BattleResultDto EntityToDto(Member member, CompetitionResult competitionResult, Problem problem, int team) {
        return BattleResultDto.builder()
                .competitionResultNo(competitionResult.getCompetitionResultNo())
                .competitionResultRecord(competitionResult.getCompetitionResultRecord())
                .team(team)
                .memberExp(member.getMemberExp())
                .nickname(member.getMemberNickname())
                .problemLevel(problem.getProblemLevel())
                .problemSource(problem.getProblemSource())
                .problemTitle(problem.getProblemTitle())
                .build();
    }

    public BattleResultDetailDto EntityToDto(List<BattleResultDto> myTeamSubmitList, List<BattleResultDto> opponentTeamSubmitList) {
        return BattleResultDetailDto.builder()
                .myTeamSubmitList(myTeamSubmitList)
                .opponentTeamSubmitList(opponentTeamSubmitList)
                .build();
    }
}
