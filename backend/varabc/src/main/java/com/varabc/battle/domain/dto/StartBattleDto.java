package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class StartBattleDto {

    private Long competitionResultNo;

    private int competitionTeam;

    private Long problemNo;

    private Long N1No;

    private Long M2No;

    @Builder
    public StartBattleDto(Long competitionResultNo, int competitionTeam, Long problemNo, Long n1No,
            Long m2No) {
        this.competitionResultNo = competitionResultNo;
        this.competitionTeam = competitionTeam;
        this.problemNo = problemNo;
        N1No = n1No;
        M2No = m2No;
    }
}
