package com.varabc.problem.repository;

import com.varabc.problem.domain.entity.TestcaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestcaseRepository extends JpaRepository<TestcaseEntity, Long> {

}
