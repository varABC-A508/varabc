package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.ProblemRestrictionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRestrictionRepository extends JpaRepository<ProblemRestrictionEntity, Long> {

    @Modifying
    @Query("UPDATE ProblemRestrictionEntity p SET p.problemRestrictionResign = true WHERE p.problemNo = ?1")
    void updateProblemRestrictionResign(Long problemNo);
}
