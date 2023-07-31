package com.varabc.problem.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Table(name= "problem")
@Entity
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@DynamicUpdate
public class ProblemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problemNo;

    @Column(name="problem_title",length=60,nullable=false)
    private String problemTitle;

    @Column(name= "problem_content",columnDefinition = "TEXT", nullable = false)
    private String problemContent;

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

//    @OneToOne(fetch = FetchType.EAGER) // ProblemEntity와 ProblemRestrictionEntity는 하나의 연결 관계를 가짐
//    @JoinColumn(name = "problem_no", referencedColumnName = "problemNo") // 조인할 외래키 이름과 참조하는 엔티티의 컬럼명 지정
//    private ProblemRestrictionEntity problemRestrictionEntity;
//
//    @OneToMany // problem 테이블은 하나의 algorithmtype 매핑됨
//    @JoinColumn(name = "problem_no") // 외래키 이름 지정 (Order 테이블에 product_id 컬럼으로 매핑)
//    private List<TestcaseEntity> testcaseEntities = new ArrayList<TestcaseEntity>();
//



}
