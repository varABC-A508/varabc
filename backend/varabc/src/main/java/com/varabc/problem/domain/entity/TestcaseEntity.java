package com.varabc.problem.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Table(name= "testcase")
@Entity
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@DynamicUpdate
public class TestcaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testcaseNo;

    @Column(name="problem_no",nullable=false)
    private Long problemNo;

    @Column(name= "testcase_input", columnDefinition = "TEXT", nullable=false)
    private String testcaseInput;
    @Column(name="testcase_output", columnDefinition = "TEXT", nullable=false)
    private String testcaseOutput;

    @Column(name="testcase_public")
   private Boolean testcasePublic;

    @Column(name="testcase_resign")
    private Boolean testcaseResign;

}
