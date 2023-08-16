package com.varabc.battle.service;

import com.varabc.battle.domain.dto.BattleInfoDto;
import com.varabc.battle.domain.dto.BattleUrlDto;
import com.varabc.battle.domain.dto.ReviewDto;
import com.varabc.battle.domain.dto.StartBattleDto;

public interface BattleService {

    Long createRoom(Long memberNo);

    boolean joinRoom(Long memberNo, Long competitionResultNo);


    void endBattle(int team, Long competitionResultNo);


    BattleInfoDto getBattleInfo(Long competitionResultNo, int team, Long problemNo);

    BattleUrlDto getBattleUrl(int competitionTeam, String roomCode, Long problemNo);

    BattleInfoDto getBattleInfo(String roomCode, StartBattleDto startBattleDto);

    void updateBattleInfoToFinal(Long competitionResultNo, StartBattleDto startBattleDto);

    boolean createReview(Long competitionResultNo, ReviewDto reviewDto);

}
