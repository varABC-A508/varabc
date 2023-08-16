package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class BattleInfoDto {

    //문제를 풀 때 필요한 정보들. 여기에 문제 정보가 포함됨.
    private Long problemNo;
    //api 호출해야하니까.

    //사용자 정보
    private String member1Email;
    private String member2Email;
    //팀 정보 1,2팀인지
    //그 팀의 멤버 정보. no.
    private int team;
    private Long m1;
    private Long m2;

    @Builder
    public BattleInfoDto(Long problemNo, String member1Email, String member2Email, int team,
            Long m1,
            Long m2) {
        this.problemNo = problemNo;
        this.member1Email = member1Email;
        this.member2Email = member2Email;
        this.team = team;
        this.m1 = m1;
        this.m2 = m2;
    }

}
