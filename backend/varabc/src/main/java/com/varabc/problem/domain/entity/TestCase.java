package com.varabc.problem.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Table(name = "test_case")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@ToString
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testCaseNo;

    @Column(name = "problem_no", nullable = false)
    private Long problemNo;

    @Column(name = "test_case_input", columnDefinition = "TEXT", nullable = false)
    private String testCaseInput;
    @Column(name = "test_case_output", columnDefinition = "TEXT", nullable = false)
    private String testCaseOutput;

    @Column(name = "test_case_public", nullable = false,columnDefinition = "TINYINT(1) default 0")
    private boolean  testCasePublic;

    @Column(name = "test_case_resign", nullable = false,columnDefinition = "TINYINT(1) default 0")
    private boolean testCaseResign;



    @Builder
    public TestCase(Long problemNo, String testCaseInput, String testCaseOutput,
            boolean testCasePublic,
            boolean testCaseResign) {
        this.problemNo = problemNo;
        this.testCaseInput = testCaseInput;
        this.testCaseOutput = testCaseOutput;
        this.testCasePublic = testCasePublic;
        this.testCaseResign = testCaseResign;
    }
}
