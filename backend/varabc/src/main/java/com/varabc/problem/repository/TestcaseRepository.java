package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.TestcaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestcaseRepository extends JpaRepository<TestcaseEntity, Long> {

    @Modifying
    @Query("UPDATE TestcaseEntity p SET p.testcaseResign = true WHERE p.problemNo = ?1")
    void updateTestcaseResign(Long problemNo);
}
