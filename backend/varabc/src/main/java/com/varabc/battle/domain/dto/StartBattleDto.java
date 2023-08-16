package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class StartBattleDto {

    private String roomCode;

    private int competitionTeam;

    private Long problemNo;

    private Long competitionResultT1M1No;

    private Long competitionResultT1M2No;

    private Long competitionResultT2M1No;

    private Long competitionResultT2M2No;


    @Builder
    public StartBattleDto(String roomCode, int competitionTeam, Long problemNo,
            Long competitionResultT1M1No, Long competitionResultT1M2No,
            Long competitionResultT2M1No,
            Long competitionResultT2M2No) {
        this.roomCode = roomCode;
        this.competitionTeam = competitionTeam;
        this.problemNo = problemNo;
        this.competitionResultT1M1No = competitionResultT1M1No;
        this.competitionResultT1M2No = competitionResultT1M2No;
        this.competitionResultT2M1No = competitionResultT2M1No;
        this.competitionResultT2M2No = competitionResultT2M2No;
    }
}
