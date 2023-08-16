package com.varabc.validation.repository;

import com.varabc.validation.domain.entity.Submit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmitRepository extends JpaRepository<Submit, Long> {

    @Query("SELECT s FROM Submit s WHERE s.competitionResultNo = ?1 AND (s.memberNo = ?2 OR s.memberNo = ?3) AND s.submitOrder = 1")
    List<Submit> getBattleList(Long competitionResultNo, Long member1, Long member2);

    List<Submit> findByMemberNoAndSubmitMode(Long memberNo, int submitMode);

    Submit findBySubmitNo(Long submitNo);

    List<Submit> findByCompetitionResultNoAndSubmitModeAndSubmitOrder(Long competitionResultNo, int submitMode, int submitStatus);

    List<Submit> findByMemberNoAndProblemNo(Long memberNo, Long problemNo);
}
