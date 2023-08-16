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
    private List<MyPageSubmitDto> myTeamSubmitList;
    private List<MyPageSubmitDto> opponentTeamSubmitList;

    @Builder
    public BattleResultDetailDto(List<MyPageSubmitDto> myTeamSubmitList,
            List<MyPageSubmitDto> opponentTeamSubmitList) {
        this.myTeamSubmitList = myTeamSubmitList;
        this.opponentTeamSubmitList = opponentTeamSubmitList;
    }
}
