package com.varabc.mypage.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class BattleListDetailDto {

    String nicknameT1M1;
    String nicknameT1M2;
    String nicknameT2M1;
    String nicknameT2M2;

    int memberExpT1M1;
    int memberExpT1M2;
    int memberExpT2M1;
    int memberExpT2M2;

    long competitionResultNo;
    //문제 출처
    String problemSource;
    //문제 난이도
    String problemLevel;
    //문제 제목
    String problemTitle;
    //문제 번호
    long problemNo;
    //내가 이겼는지.
    boolean isWinner;

    @Builder
    public BattleListDetailDto(String nicknameT1M1, String nicknameT1M2, String nicknameT2M1,
            String nicknameT2M2, int memberExpT1M1, int memberExpT1M2, int memberExpT2M1,
            int memberExpT2M2, long competitionResultNo, String problemSource,
            String problemLevel,
            String problemTitle, long problemNo, boolean isWinner) {
        this.nicknameT1M1 = nicknameT1M1;
        this.nicknameT1M2 = nicknameT1M2;
        this.nicknameT2M1 = nicknameT2M1;
        this.nicknameT2M2 = nicknameT2M2;
        this.memberExpT1M1 = memberExpT1M1;
        this.memberExpT1M2 = memberExpT1M2;
        this.memberExpT2M1 = memberExpT2M1;
        this.memberExpT2M2 = memberExpT2M2;
        this.competitionResultNo = competitionResultNo;
        this.problemSource = problemSource;
        this.problemLevel = problemLevel;
        this.problemTitle = problemTitle;
        this.problemNo = problemNo;
        this.isWinner = isWinner;
    }
}
