package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class FinalResultListDto {

    private List<FinalResultDto> winnerList;
    private List<FinalResultDto> loserList;

    @Builder
    public FinalResultListDto(List<FinalResultDto> winnerList, List<FinalResultDto> loserList) {
        this.winnerList = winnerList;
        this.loserList = loserList;
    }
}
