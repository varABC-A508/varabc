package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.ProblemRestriction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRestrictionRepository extends
        JpaRepository<ProblemRestriction, Long> {

    ProblemRestriction findByProblemNo(Long problemNo);
    @Modifying
    @Query("UPDATE ProblemRestriction p SET p.problemRestrictionResign = true WHERE p.problemNo = ?1")
    void updateProblemRestrictionResign(Long problemNo);
}
