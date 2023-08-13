package com.varabc.battle.repository;

import com.varabc.battle.domain.entity.CompetitionResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionResultRepository extends JpaRepository<CompetitionResult, Long> {

    List<CompetitionResult> findByCompetitionResultT1M1NoOrCompetitionResultT1M2NoOrCompetitionResultT2M1NoOrCompetitionResultT2M2No(Long competitionResultT1M1No, Long competitionResultT1M2No,Long competitionResultT2M1No, Long competitionResultT2M2No);


    CompetitionResult findByCompetitionResultNo(Long competitionResultNo);
}
