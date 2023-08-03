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
    private Double problemRestrictionPython;

    @Column(name = "problem_restriction_time_java", nullable = false)
    private Double problemRestrictionJava;

    @Column(name = "problem_restriction_memory", nullable = false)
    private int problemRestrictionMemory;

    @Column(name = "problem_restriction_resign", nullable = false,columnDefinition = "TINYINT(1) default 0")
    private Boolean problemRestrictionResign;


    @Builder
    public ProblemRestriction(Long problemNo,
            Double problemRestrictionTimePython, Double problemRestrictionTimeJava,
            int problemRestrictionMemory) {
        this.problemNo = problemNo;
        this.problemRestrictionPython = problemRestrictionTimePython;
        this.problemRestrictionJava = problemRestrictionTimeJava;
        this.problemRestrictionMemory = problemRestrictionMemory;
        this.problemRestrictionResign = false;
    }
}
