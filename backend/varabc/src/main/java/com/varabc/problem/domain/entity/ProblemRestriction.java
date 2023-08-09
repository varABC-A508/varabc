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
@Table(name = "problem_restriction")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@ToString
public class ProblemRestriction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemRestrictionNo;

    @Column(name = "problem_no", nullable = false)
    private Long problemNo;

    @Column(name = "problem_restriction_time_python", nullable = false)
    private Double problemRestrictionTimePython;

    @Column(name = "problem_restriction_time_java", nullable = false)
    private Double problemRestrictionTimeJava;

    @Column(name = "problem_restriction_memory", nullable = false)
    private int problemRestrictionMemory;

    @Column(name = "problem_restriction_resign", nullable = false,columnDefinition = "TINYINT(1) default 0")
    private boolean problemRestrictionResign;


    @Builder
    public ProblemRestriction(Long problemNo, Double problemRestrictionTimePython,
            Double problemRestrictionTimeJava, int problemRestrictionMemory,
            boolean problemRestrictionResign) {
        this.problemNo = problemNo;
        this.problemRestrictionTimePython = problemRestrictionTimePython;
        this.problemRestrictionTimeJava = problemRestrictionTimeJava;
        this.problemRestrictionMemory = problemRestrictionMemory;
        this.problemRestrictionResign = problemRestrictionResign;
    }

    public void updateRestriction(ProblemRestriction problemRestriction) {
        this.problemRestrictionTimePython = problemRestriction.getProblemRestrictionTimePython();
        this.problemRestrictionTimeJava = problemRestriction.getProblemRestrictionTimeJava();
        this.problemRestrictionMemory = problemRestriction.getProblemRestrictionMemory();
    }
}
