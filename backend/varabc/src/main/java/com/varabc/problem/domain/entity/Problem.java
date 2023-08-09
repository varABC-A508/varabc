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
@Table(name = "problem")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@ToString
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemNo;

    @Column(name = "problem_title", length = 60, nullable = false)
    private String problemTitle;

    @Column(name = "problem_content", columnDefinition = "TEXT", nullable = false)
    private String problemContent;

    @Column(name = "problem_level", length = 60, nullable = false)
    private String problemLevel;

    @Column(name = "problem_submit_count", columnDefinition = "default 0")
    private int problemSubmitCount;

    @Column(name = "problem_correct_count", columnDefinition = "default 0")
    private int problemCorrectCount;

    @Column(name = "problem_input_content", columnDefinition = "TEXT", nullable = false)
    private String problemInputContent;

    @Column(name = "problem_output_content", columnDefinition = "TEXT", nullable = false)
    private String problemOutputContent;

    @Column(name = "problem_link", columnDefinition = "TEXT")
    private String problemLink;

    @Column(name = "problem_source", columnDefinition = "TEXT", nullable = false)
    private String problemSource;

    @Column(name = "problem_algorithm_type", length = 20, nullable = false)
    private String problemAlgorithmType;

    @Column(name = "problem_resign", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean problemResign;

    public void updateCounts(int correct) {
        if (correct == 1) {
            this.problemCorrectCount += 1;
        }
        this.problemSubmitCount += 1;
    }

    public void updateProblem(Problem problem) {
        this.problemTitle = problem.getProblemTitle();
        this.problemContent = problem.getProblemContent();
        this.problemLevel = problem.getProblemLevel();
        this.problemSubmitCount = problem.getProblemSubmitCount();
        this.problemCorrectCount = problem.getProblemCorrectCount();
        this.problemInputContent = problem.getProblemInputContent();
        this.problemOutputContent = problem.getProblemOutputContent();
        this.problemLink = problem.getProblemLink();
        this.problemSource = problem.getProblemSource();
        this.problemAlgorithmType = problem.getProblemAlgorithmType();

    }
    public void updateContent(String problemContent) {
        this.problemContent = problemContent;
    }

    @Builder
    public Problem(String problemTitle, String problemContent, String problemLevel,
            int problemSubmitCount, int problemCorrectCount, String problemInputContent,
            String problemOutputContent, String problemLink, String problemSource,
            String problemAlgorithmType, boolean problemResign) {
        this.problemTitle = problemTitle;
        this.problemContent = problemContent;
        this.problemLevel = problemLevel;
        this.problemSubmitCount = problemSubmitCount;
        this.problemCorrectCount = problemCorrectCount;
        this.problemInputContent = problemInputContent;
        this.problemOutputContent = problemOutputContent;
        this.problemLink = problemLink;
        this.problemSource = problemSource;
        this.problemAlgorithmType = problemAlgorithmType;
        this.problemResign = problemResign;
    }



}
