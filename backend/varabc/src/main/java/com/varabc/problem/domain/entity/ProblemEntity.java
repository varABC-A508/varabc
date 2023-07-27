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

@Getter
@Table(name= "problem")
@Entity
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class ProblemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemNo;

    @Column(name="problem_title",length=60,nullable=false)
    private String problemTitle;

    @Column(name= "problem_content",columnDefinition = "TEXT", nullable = false)
    private String problemContent;

    @Column(name = "problem_time_limit", nullable= false)
    private double problemTimeLimit;

    @Column(name="problem_memory_limit", nullable = false)
    private int problemMemoryLimit;

    @Column(name="problem_level",length=60,nullable=false)
    private String problemLevel;

    @Column(name="problem_submit_count")
    private int problemSubmitCount;

    @Column(name="problem_correct_count")
    private int problemCorrectCount;

    @Column(name="problem_input_content",columnDefinition = "TEXT", nullable = false)
    private String problemInputContent;

    @Column(name="problem_output_content",columnDefinition = "TEXT", nullable = false)
    private String problemOutputContent;

    @Column(name="problem_link",columnDefinition = "TEXT")
    private String problemLink;

    @Column(name="problem_source",columnDefinition = "TEXT", nullable = false)
    private String problemSource;

    @Column(name="problem_resign")
    private Boolean problemResign;


    @Builder
    public ProblemEntity(Long problemNo, String problemTitle, String problemContent, double problemTimeLimit,
            int problemMemoryLimit, String problemLevel, int problemSubmitCount, int problemCorrectCount,
            String problemInputContent, String problemOutputContent, String problemLink,
            String problemSource, Boolean problemResign) {
        this.problemNo = problemNo;
        this.problemTitle = problemTitle;
        this.problemContent = problemContent;
        this.problemTimeLimit = problemTimeLimit;
        this.problemMemoryLimit = problemMemoryLimit;
        this.problemLevel = problemLevel;
        this.problemSubmitCount = problemSubmitCount;
        this.problemCorrectCount = problemCorrectCount;
        this.problemInputContent = problemInputContent;
        this.problemOutputContent = problemOutputContent;
        this.problemLink = problemLink;
        this.problemSource = problemSource;
        this.problemResign = problemResign;
    }
}
