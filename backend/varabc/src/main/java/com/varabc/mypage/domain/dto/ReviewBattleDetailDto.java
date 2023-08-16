package com.varabc.mypage.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ReviewBattleDetailDto {
    //    팀1 의 멤버 정보: nickname, exp,  프로필 이미지, 그리고  problem_no 랑 problem_title, 알고리즘 타입,
    String nicknameT1M1;
    String nicknameT1M2;
    String nicknameT2M1;
    String nicknameT2M2;

    int memberExpT1M1;
    int memberExpT1M2;
    int memberExpT2M1;
    int memberExpT2M2;

    String memberImageT1M1;
    String memberImageT1M2;
    String memberImageT2M1;
    String memberImageT2M2;

    long competitionResultNo;
    //문제 제목
    String problemTitle;
    //문제 번호
    long problemNo;

    String problemAlgorithmType;
    //내가 이겼는지.
    boolean isWinner;

    @Builder
    public ReviewBattleDetailDto(String nicknameT1M1, String nicknameT1M2, String nicknameT2M1,
            String nicknameT2M2, int memberExpT1M1, int memberExpT1M2, int memberExpT2M1,
            int memberExpT2M2, String memberImageT1M1, String memberImageT1M2,
            String memberImageT2M1,
            String memberImageT2M2, long competitionResultNo, String problemTitle, long problemNo,
            String problemAlgorithmType, boolean isWinner) {
        this.nicknameT1M1 = nicknameT1M1;
        this.nicknameT1M2 = nicknameT1M2;
        this.nicknameT2M1 = nicknameT2M1;
        this.nicknameT2M2 = nicknameT2M2;
        this.memberExpT1M1 = memberExpT1M1;
        this.memberExpT1M2 = memberExpT1M2;
        this.memberExpT2M1 = memberExpT2M1;
        this.memberExpT2M2 = memberExpT2M2;
        this.memberImageT1M1 = memberImageT1M1;
        this.memberImageT1M2 = memberImageT1M2;
        this.memberImageT2M1 = memberImageT2M1;
        this.memberImageT2M2 = memberImageT2M2;
        this.competitionResultNo = competitionResultNo;
        this.problemTitle = problemTitle;
        this.problemNo = problemNo;
        this.problemAlgorithmType = problemAlgorithmType;
        this.isWinner = isWinner;
    }
}