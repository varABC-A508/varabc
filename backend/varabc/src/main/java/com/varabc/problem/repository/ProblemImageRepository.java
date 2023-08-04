package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.ProblemImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemImageRepository extends JpaRepository<ProblemImage,Long> {

    @Modifying
    @Query("UPDATE ProblemImage p SET p.problemImageResign = true WHERE p.problemNo = ?1")
    void updateProblemImageResign(Long problemNo);

    List<ProblemImage> findByProblemNo(Long problemNo);

    @Modifying
    @Query("DELETE FROM ProblemImage p WHERE p.problemNo = ?1")
    void delete(Long problemNo);
}
