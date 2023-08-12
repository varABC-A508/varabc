package com.varabc.battle.service;

import com.varabc.battle.domain.dto.BattleInfoDto;
import com.varabc.battle.domain.dto.BattleUrlDto;
import com.varabc.battle.domain.dto.ReviewDto;
import com.varabc.battle.domain.dto.StartBattleDto;
import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.battle.domain.entity.Review;
import com.varabc.battle.domain.entity.ReviewTag;
import com.varabc.battle.mapper.BattleMapper;
import com.varabc.battle.repository.CompetitionResultRepository;
import com.varabc.battle.repository.ReviewRepository;
import com.varabc.battle.repository.ReviewTagRepository;
import com.varabc.member.service.MemberService;
import jakarta.transaction.Transactional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BattleServiceImpl implements BattleService {

    private final BattleMapper battleMapper;
    private final CompetitionResultRepository competitionResultRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewTagRepository reviewTagRepository;
    private final MemberService memberService;

    @Override
    public Long createRoom(Long memberNo) {
        CompetitionResult competitionResult = battleMapper.createEntity(memberNo);
        competitionResultRepository.save(competitionResult);
        return competitionResult.getCompetitionResultNo();
    }

    @Transactional
    public boolean joinRoom(Long memberNo, Long competitionResultNo) {
        CompetitionResult competitionResult = competitionResultRepository.findById(
                competitionResultNo).orElse(null);
        System.out.println(competitionResult);
        System.out.println("\n");
        if (competitionResult == null) {
            System.out.println("그런 경기 없음");
        } else {
            if (competitionResult.getCompetitionResultMemberCount() == 4) {
                //이미 방 다 참.
                System.out.println("full room");
            } else {
                //이미 있는 멤버라면 추가 ㄴㄴ //수정 필요. 그냥 카운트만 올리도록.
                if (competitionResult.search(memberNo)) {
                    competitionResult.updateMember(
                            competitionResult.getCompetitionResultMemberCount());
                    return true;
                } else {
                    System.out.println("이미 대결에 참여중");
                    return false;
                }
            }

        }

        return false;
    }

    @Transactional
    public void endBattle(int team, Long competitionResultNo) {
        //경기 기록 업데이트 시켜야.
        CompetitionResult competitionResult = competitionResultRepository.findById(
                competitionResultNo).orElse(null);
        System.out.println(competitionResult);
        if (competitionResult == null) {
            System.out.println("배틀 코드 잘못 입력");
        } else {
            competitionResult.updateResult(team); //이긴 팀 정보로 업데이트 시켜주기.
        }

    }


    @Override
    public BattleInfoDto getBattleInfo(Long competitionResultNo, int team, Long problemNo) {
        return null;
    }

    @Override
    public BattleUrlDto getBattleUrl(int competitionTeam, String roomCode, Long problemNo) {
        String url1 = null;
        String url2 = null;
        Random rand = new Random();
//        if (competitionTeam == 1) {
        //1팀으로 등록학고 정보 넘겨주는 식으로
        int ranN1 = rand.nextInt(Integer.MAX_VALUE);
        url1 = "/battle/" + problemNo + "/game/" + roomCode + "/" + ranN1;
//            다른 url을 리턴해서 redirect 시킨다
//        } else {
        //2팀으로 등록하고 정보 넘겨주는 식으로
        int ranN2 = rand.nextInt(Integer.MAX_VALUE);
        url2 = "/battle/" + problemNo + "/game/" + roomCode + "/" + ranN2;
//        }
        return battleMapper.urlToDto(url1, url2);
    }

    @Override
    public BattleInfoDto getBattleInfo(String roomCode, StartBattleDto startBattleDto) {
        String email1 = null;
        String email2 = null;
        if (startBattleDto.getCompetitionTeam() == 1) {
            email1 = memberService.getEmail(startBattleDto.getCompetitionResultT1M1No());
            email2 = memberService.getEmail(startBattleDto.getCompetitionResultT1M2No());
        } else {
            email1 = memberService.getEmail(startBattleDto.getCompetitionResultT2M1No());
            email2 = memberService.getEmail(startBattleDto.getCompetitionResultT2M2No());
        }
        return battleMapper.getBattleInfo(roomCode, startBattleDto, email1, email2);
    }

    @Transactional
    public void updateBattleInfoToFinal(Long competitionResultNo, StartBattleDto startBattleDto) {
        CompetitionResult competitionResult = competitionResultRepository.findById(
                competitionResultNo).orElse(null);
        competitionResult.updateCompetition(startBattleDto);

    }

    @Override
    public boolean createReview(Long competitionResultNo, ReviewDto reviewDto) {
        //디비에 저장 필요.
        //근데 디비가 두개임요.
        //그래서 먼저 리뷰 등록하고 그 no 받아와서 등록해야함요.
        Review review = battleMapper.createEntity(competitionResultNo, reviewDto);
        reviewRepository.save(review);
        Long reviewNo = review.getReviewNo();
        ReviewTag reviewTag = battleMapper.createEntity(reviewDto,reviewNo);
        reviewTagRepository.save(reviewTag);
        return true;
    }




}
