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

@Getter
@Table(name = "problem_image")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ProblemImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemImageNo;

    @Column(name = "problem_no", nullable = false)
    private Long problemNo;

    @Column(name = "problem_image_s3_url",  nullable = false)
    private String problemImageS3Url;

    @Column(name = "problem_image_resign", nullable = false,columnDefinition = "TINYINT(1) default 0")
    private boolean problemImageResign;

    @Builder
    public ProblemImage(Long problemNo, String problemImageS3Url, boolean problemImageResign) {
        this.problemNo = problemNo;
        this.problemImageS3Url = problemImageS3Url;
        this.problemImageResign = problemImageResign;
    }
}
