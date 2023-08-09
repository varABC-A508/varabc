package com.varabc.battle.service;

import com.varabc.battle.domain.dto.StartBattleDto;

public interface BattleService {

    Long createRoom(Long memberNo);

    void joinRoom(Long memberNo, Long competitionResultNo);

    void endBattle(int team, Long competitionResultNo);

    void updateBattleInfoToFinal(StartBattleDto startBattleDto);
}
