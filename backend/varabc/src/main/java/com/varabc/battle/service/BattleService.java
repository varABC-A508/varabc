package com.varabc.battle.service;

public interface BattleService {

    Long createRoom(Long memberNo);

    void joinRoom(Long memberNo, Long competitionResultNo);
}
