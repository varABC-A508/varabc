package com.varabc.validation.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="testcase")
@Getter
@ToString
@NoArgsConstructor
public class TestCase {
    @Id
    @Column(name = "testcase_no", nullable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long testCaseNo;
    @Column(name = "problem_no", nullable = false, insertable = false)
    private long problemNo;
    @Column(name = "testcase_input", nullable = false, insertable = false)
    private String testCaseInput;
    @Column(name = "testcase_output", nullable = false, insertable = false)
    private String testCaseOutput;
    @Column(name = "testcase_public", nullable = true, insertable = false)
    private int testCasePublic;
    @Column(name = "testcase_resign", nullable = true, insertable = false)
    private int testCaseResign;

    @Builder
    public TestCase(long testCaseNo, long problemNo, String testCaseInput, String testCaseOutput,
            int testCasePublic, int testCaseResign) {
        this.testCaseNo = testCaseNo;
        this.problemNo = problemNo;
        this.testCaseInput = testCaseInput;
        this.testCaseOutput = testCaseOutput;
        this.testCasePublic = testCasePublic;
        this.testCaseResign = testCaseResign;
    }
}
