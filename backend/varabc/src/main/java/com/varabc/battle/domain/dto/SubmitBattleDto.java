package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class SubmitBattleDto {
//- 멤버 정보 (2명 다)
//- 문제 번호
//- 작성 코드
//- 작성 언어
    private String battleCode;
    private Long problemNo;
    private Long member1;
    private Long member2;
    private int team;
    private String code;
    private String language;

    @Builder
    public SubmitBattleDto(String battleCode,Long problemNo, Long member1, Long member2, String code,
            String language) {
        this.battleCode= battleCode;
        this.problemNo = problemNo;
        this.member1 = member1;
        this.member2 = member2;
        this.code = code;
        this.language = language;
    }
}
