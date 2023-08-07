package com.varabc.battle.mapper;

import com.varabc.battle.domain.entity.CompetitionResult;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public class BattleMapper {

    public CompetitionResult createEntity(Long memberNo) {
        return CompetitionResult.builder()
                .competitionResultT1M1No(memberNo)
                .competitionResultMemberCount(1)
                .competitionResultResign(false)
                .build();
    }



}
