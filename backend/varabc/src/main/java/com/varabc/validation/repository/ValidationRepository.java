package com.varabc.validation.repository;

import com.varabc.problem.domain.entity.TestCase;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationRepository extends JpaRepository<TestCase, Long> {
    List<TestCase> findByProblemNo(long problemNo);
    List<TestCase> findByProblemNoAndTestCasePublic(long problemNo, boolean isPublic);
}