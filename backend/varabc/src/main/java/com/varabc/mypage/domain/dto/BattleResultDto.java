package com.varabc.mypage.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class BattleResultDto {
//    네임, 문제 이름, 문제 출처랑 레벨, 내 경험치까지 가져와야한다. 승패 결과도. 내가 몇팀이었는지도? + 배틀 번호
    private String nickname;
    private String problemTitle;
    private String problemLevel;
    private String problemSource;
    private int memberExp;
    private int competitionResultRecord;
    private int team;
    private Long competitionResultNo;

    @Builder
    public BattleResultDto(String nickname, String problemTitle, String problemLevel,
            String problemSource, int memberExp, int competitionResultRecord, int team,
            Long competitionResultNo) {
        this.nickname = nickname;
        this.problemTitle = problemTitle;
        this.problemLevel = problemLevel;
        this.problemSource = problemSource;
        this.memberExp = memberExp;
        this.competitionResultRecord = competitionResultRecord;
        this.team = team;
        this.competitionResultNo = competitionResultNo;
    }
}

