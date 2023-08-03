package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.ProblemImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemImageRepository extends JpaRepository<ProblemImage,Long> {

}
