package com.varabc.mypage.mapper;

import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.battle.domain.entity.Review;
import com.varabc.battle.domain.entity.ReviewTag;
import com.varabc.member.domain.entity.Member;
import com.varabc.mypage.domain.dto.BattleListDetailDto;
import com.varabc.mypage.domain.dto.BattleResultDetailDto;
import com.varabc.mypage.domain.dto.MyPageReviewDto;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.mypage.domain.dto.ReviewBattleDetailDto;
import com.varabc.mypage.domain.dto.SubmitCodeDto;
import com.varabc.problem.domain.entity.Problem;
import com.varabc.validation.domain.dto.SubmitDto;
import com.varabc.validation.domain.entity.Submit;
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
                .competitionResultNo(review.getCompetitionResultNo())
                .build();
    }
//
//    public BattleResultDto EntityToDto(Member member, CompetitionResult competitionResult,
//            Problem problem, int team) {
//        return BattleResultDto.builder()
//                .competitionResultNo(competitionResult.getCompetitionResultNo())
//                .competitionResultRecord(competitionResult.getCompetitionResultRecord())
//                .team(team)
//                .memberExp(member.getMemberExp())
//                .nickname(member.getMemberNickname())
//                .problemLevel(problem.getProblemLevel())
//                .problemSource(problem.getProblemSource())
//                .problemTitle(problem.getProblemTitle())
//                .build();
//    }

    public BattleResultDetailDto EntityToDto(List<MyPageSubmitDto> myTeamSubmitList,
            List<MyPageSubmitDto> opponentTeamSubmitList) {
        return BattleResultDetailDto.builder()
                .myTeamSubmitList(myTeamSubmitList)
                .opponentTeamSubmitList(opponentTeamSubmitList)
                .build();
    }

    public MyPageSubmitDto EntityToDto(Member member, Submit submit, String submitStatus) {
        return MyPageSubmitDto.builder()
                .nickname(member.getMemberNickname())
                .submitNo(submit.getSubmitNo())
                .competitionResultNo(submit.getCompetitionResultNo())
                .problemNo(submit.getProblemNo())
                .submitStatus(submitStatus)
                .submitUsedMemory(submit.getSubmitUsedMemory())
                .submitUsedTime(submit.getSubmitUsedTime())
                .submitLanguage(submit.getSubmitLanguage())
                .submitTime(submit.getSubmitTime())
                .build();
    }

    public MyPageSubmitDto EntityToDto(Submit submit, String submitStatus, String problemTitle) {
        return MyPageSubmitDto.builder()
                .submitNo(submit.getSubmitNo())
                .competitionResultNo(submit.getCompetitionResultNo())
                .problemNo(submit.getProblemNo())
                .submitStatus(submitStatus)
                .submitUsedMemory(submit.getSubmitUsedMemory())
                .submitUsedTime(submit.getSubmitUsedTime())
                .submitLanguage(submit.getSubmitLanguage())
                .submitTime(submit.getSubmitTime())
                .problemTitle(problemTitle)
                .build();
    }

    public BattleListDetailDto EntityToDto(CompetitionResult competitionResult, Problem problem,
            Member member1, Member member2, Member member3, Member member4, boolean isWinner) {
        return BattleListDetailDto.builder()
                .nicknameT1M1(member1.getMemberNickname())
                .nicknameT1M2(member2.getMemberNickname())
                .nicknameT2M1(member3.getMemberNickname())
                .nicknameT2M2(member4.getMemberNickname())
                .memberExpT1M1(member1.getMemberExp())
                .memberExpT2M1(member2.getMemberExp())
                .memberExpT2M1(member3.getMemberExp())
                .memberExpT2M2(member4.getMemberExp())
                .competitionResultNo(competitionResult.getCompetitionResultNo())
                .problemSource(problem.getProblemSource())
                .problemLevel(problem.getProblemLevel())
                .problemTitle(problem.getProblemTitle())
                .problemNo(problem.getProblemNo())
                .isWinner(isWinner)
                .build();
    }


    public SubmitCodeDto EntityToDto(Submit submit, Member member, Problem problem) {
        SubmitCodeDto.SubmitCodeDtoBuilder builder =
                SubmitCodeDto.builder()
                        .nickname(member.getMemberNickname())
                        .memberExp(member.getMemberExp())
                        .problemTitle(problem.getProblemTitle());

        SubmitDto submitDto = SubmitDto.builder()
                .submitNo(submit.getSubmitNo())
                .problemNo(submit.getProblemNo())
                .memberNo(submit.getMemberNo())
                .competitionResultNo(submit.getCompetitionResultNo())
                .submitMode(submit.getSubmitMode())
                .submitStatus(submit.getSubmitStatus())
                .submitCode(submit.getSubmitCode())
                .submitTime(submit.getSubmitTime())
                .submitUsedMemory(submit.getSubmitUsedMemory())
                .submitUsedTime(submit.getSubmitUsedTime())
                .submitLanguage(submit.getSubmitLanguage())
                .build();

        builder.submitDto(submitDto);

        return builder.build();
    }


    public ReviewBattleDetailDto EntityToReviewBattleDetailDto(CompetitionResult competitionResult, Problem problem, Member member1, Member member2, Member member3, Member member4,
            boolean isWinner) {
        return  ReviewBattleDetailDto.builder()
                .nicknameT1M1(member1.getMemberNickname())
                .nicknameT1M2(member2.getMemberNickname())
                .nicknameT2M1(member3.getMemberNickname())
                .nicknameT2M2(member4.getMemberNickname())
                .memberImageT1M1(member1.getMemberImage())
                .memberImageT1M2(member2.getMemberImage())
                .memberImageT2M1(member3.getMemberImage())
                .memberImageT2M2(member4.getMemberImage())
                .memberExpT1M1(member1.getMemberExp())
                .memberExpT1M2(member2.getMemberExp())
                .memberExpT2M1(member3.getMemberExp())
                .memberExpT2M2(member4.getMemberExp())
                .competitionResultNo(competitionResult.getCompetitionResultNo())
                .problemTitle(problem.getProblemTitle())
                .problemNo(problem.getProblemNo())
                .problemAlgorithmType(problem.getProblemAlgorithmType())
                .isWinner(isWinner)
                .build();
    }
}
