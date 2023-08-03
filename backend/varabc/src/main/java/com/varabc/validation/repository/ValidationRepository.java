package com.varabc.validation.repository;

import com.varabc.validation.domain.entity.TestCaseVal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface ValidationRepository extends JpaRepository<TestCaseVal, Long> {
        List<TestCaseVal> findByProblemNo(long problemNo);
}