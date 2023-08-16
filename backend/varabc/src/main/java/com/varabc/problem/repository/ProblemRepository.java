package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.Problem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepository extends JpaRepository<Problem,Long> {

    @Modifying
    @Query("UPDATE Problem p SET p.problemResign = true WHERE p.problemNo = ?1")
    void updateProblemResign(Long problemNo);

    @Query("SELECT p.problemNo FROM Problem p WHERE p.problemSource = :source AND p.problemLevel LIKE :level% AND p.problemResign = false")
    List<Long> getList(@Param("source") String problemSource, @Param("level") String problemLevel);


    List<Problem> findByProblemTitleContainingAndProblemAlgorithmType(String keyword, String compareBit);
    List<Problem> findByProblemTitleContaining(String keyword);
    List<Problem> findByProblemNoContaining(long problemNo);

    List<Problem> findByProblemNoAndProblemAlgorithmType(long problemNo, String compareBit);
    List<Problem> findByProblemAlgorithmType(String compareBit);

    @Query("SELECT p FROM Problem p WHERE p.problemNo IN (SELECT s.problemNo FROM Submit s WHERE s.competitionResultNo = :competitionResultNo)")
    List<Problem> findProblemsByCompetitionResultNo(@Param("competitionResultNo") Long competitionResultNo);

    Problem findByProblemNo(long problemNo);
}