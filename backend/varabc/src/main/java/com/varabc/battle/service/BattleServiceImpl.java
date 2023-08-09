package com.varabc.battle.service;

import com.varabc.battle.domain.dto.StartBattleDto;
import com.varabc.battle.domain.entity.CompetitionResult;
import com.varabc.battle.mapper.BattleMapper;
import com.varabc.battle.repository.CompetitionResultRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BattleServiceImpl implements BattleService {

    private final BattleMapper battleMapper;
    private final CompetitionResultRepository competitionResultRepository;

    @Override
    public Long createRoom(Long memberNo) {
        CompetitionResult competitionResult = battleMapper.createEntity(memberNo);
        competitionResultRepository.save(competitionResult);
        return competitionResult.getCompetitionResultNo();
    }

    @Transactional
    public void joinRoom(Long memberNo, Long competitionResultNo) {
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
                //이미 있는 멤버라면 추가 ㄴㄴ
                if (competitionResult.search(memberNo))
                    competitionResult.updateMember(memberNo,
                            competitionResult.getCompetitionResultMemberCount());
                else {
                    System.out.println("이미 대결에 참여중");
                }
            }

        }

    }

    @Transactional
    public void endBattle(int team, Long competitionResultNo) {
        //경기 기록 업데이트 시켜야.
        CompetitionResult competitionResult = competitionResultRepository.findById(
                competitionResultNo).orElse(null);
        if(competitionResult==null){
            System.out.println("배틀 코드 잘못 입력");
        }else{
            competitionResult.updateResult(team); //이긴 팀 정보로 업데이트 시켜주기.
        }

    }

    @Override
    public void updateBattleInfoToFinal(StartBattleDto startBattleDto) {
//        CompetitionResult competitionResult = competitionResultRepository.findById(
//                competitionResultNo).orElse(null);
    }
}
