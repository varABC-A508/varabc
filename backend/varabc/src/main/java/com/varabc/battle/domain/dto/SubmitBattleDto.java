package com.varabc.battle.domain.dto;

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
    private Long member1;
    private Long member2;
    private String code;

}
