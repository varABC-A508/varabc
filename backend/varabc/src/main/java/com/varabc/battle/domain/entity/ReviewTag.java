package com.varabc.battle.domain.entity;

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
@Table(name = "review_tag")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@ToString
public class ReviewTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewTagNo;

    @Column(name = "review_no", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private Long reviewNo;
    @Column(name = "review_tag_readability",columnDefinition = "TINYINT(1) default 0")
    private boolean reviewTagReadability;
    @Column(name = "review_tag_naming",  columnDefinition = "TINYINT(1) default 0")
    private boolean reviewTagNaming;
    @Column(name = "review_tag_speed", columnDefinition = "TINYINT(1) default 0")
    private boolean reviewTagSpeed;
    @Column(name = "review_tag_communication", columnDefinition = "TINYINT(1) default 0")
    private boolean reviewTagCommunication;
    @Column(name = "review_tag_resign", columnDefinition = "TINYINT(1) default 0")
    private boolean reviewTagCResign;

    @Builder
    public ReviewTag(Long reviewNo, boolean reviewTagReadability, boolean reviewTagNaming,
            boolean reviewTagSpeed, boolean reviewTagCommunication, boolean reviewTagCResign) {
        this.reviewNo = reviewNo;
        this.reviewTagReadability = reviewTagReadability;
        this.reviewTagNaming = reviewTagNaming;
        this.reviewTagSpeed = reviewTagSpeed;
        this.reviewTagCommunication = reviewTagCommunication;
        this.reviewTagCResign = reviewTagCResign;
    }

    public void updateReviewTagResign(boolean b) {
        this.reviewTagCResign = b;
    }
}
