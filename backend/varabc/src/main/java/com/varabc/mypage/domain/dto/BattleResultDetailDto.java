package com.varabc.mypage.domain.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class BattleResultDetailDto {
    private List<BattleResultDto> myTeamSubmitList;
    private List<BattleResultDto> opponentTeamSubmitList;

    @Builder
    public BattleResultDetailDto(List<BattleResultDto> myTeamSubmitList,
            List<BattleResultDto> opponentTeamSubmitList) {
        this.myTeamSubmitList = myTeamSubmitList;
        this.opponentTeamSubmitList = opponentTeamSubmitList;
    }
}
