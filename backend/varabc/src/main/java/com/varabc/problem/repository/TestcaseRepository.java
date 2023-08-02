package com.varabc.problem.repository;

import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.domain.entity.TestcaseEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestcaseRepository extends JpaRepository<TestcaseEntity, Long> {

    List<TestcaseEntity> findByProblemNo(Long problemNo);

    @Modifying
    @Query("UPDATE TestcaseEntity p SET p.testcaseResign = true WHERE p.problemNo = ?1")
    void updateTestcaseResign(Long problemNo);

    @Modifying
    @Query("DELETE FROM TestcaseEntity p WHERE p.problemNo = ?1")
    void delete(Long problemNo);

//    @Modifying
//    @Query("UPDATE TestcaseEntity p SET p.testcaseInput = ?2, p.testcaseOutput=?3 WHERE p.problemNo = ?1")
//    void updateTestcaseData(Long problemNo,String testcaseInput, String testcaseOutput);
}
