package com.varabc.validation.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="submit")
@Getter
@ToString
@NoArgsConstructor
public class  Submit {
    @Id
    @Column(name = "submit_no", nullable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long submitNo;

    @Column(name = "problem_no", nullable = false)
    private long problemNo;

    @Column(name="member_no",nullable = false)
    private long memberNo;

    @Column(name="competition_result_no",nullable = true)
    private long competitionResultNo;

    @Column(name="submit_mode",nullable = false)
    private int submitMode;

    @Column(name="submit_status",nullable = false)
    private int submitStatus;

    @Column(name = "submit_code", nullable = false)
    private String submitCode;

    @Column(name="submit_time",nullable = true, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String submitTime;

    @Column(name="submit_used_memory",nullable = true)
    private int submitUsedMemory;

    @Column(name="submit_used_time",nullable = true)
    private double submitUsedTime;


    @Builder
    public Submit(long problemNo, long memberNo, int competitionResultNo, int submitMode,
            int submitStatus, String submitCode, int submitUsedMemory, double submitUsedTime) {
        this.problemNo = problemNo;
        this.memberNo = memberNo;
        this.competitionResultNo = competitionResultNo;
        this.submitMode = submitMode;
        this.submitStatus = submitStatus;
        this.submitCode = submitCode;
        this.submitUsedMemory = submitUsedMemory;
        this.submitUsedTime = submitUsedTime;
    }
}
