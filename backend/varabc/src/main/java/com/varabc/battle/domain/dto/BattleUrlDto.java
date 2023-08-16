package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class BattleUrlDto {
    private String url1;
    private String url2;

    @Builder
    public BattleUrlDto(String url1, String url2) {
        this.url1 = url1;
        this.url2 = url2;
    }
}
