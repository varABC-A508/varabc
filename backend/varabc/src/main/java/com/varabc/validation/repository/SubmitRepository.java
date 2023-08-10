package com.varabc.validation.repository;

import com.varabc.validation.domain.entity.Submit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface SubmitRepository extends JpaRepository<Submit, Long> {

    @Query("SELECT s FROM Submit s WHERE s.competitionResultNo = ?1 AND (s.memberNo = ?2 OR s.memberNo = ?3) AND s.submitOrder = 1")
    List<Submit> getBattleList(Long competitionResultNo, Long member1, Long member2);
}
