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
@Table(name = "review")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@ToString
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewNo;

    @Column(name = "competition_result_no", nullable = false)
    private Long competitionResultNo;
    @Column(name = "review_send_member_no", nullable = false)
    private Long reviewSendMemberNo;
    @Column(name = "review_receive_member_no", nullable = false)
    private Long reviewReceiveMemberNo;
    @Column(name = "review_content", length = 100, nullable = true)
    private String reviewContent;
    @Column(name = "review_time", nullable = true, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String reviewTime;
    @Column(name = "review_resign", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean reviewResign;

    @Builder
    public Review(Long competitionResultNo, Long reviewSendMemberNo, Long reviewReceiveMemberNo,
            String reviewContent, boolean reviewResign) {
        this.competitionResultNo = competitionResultNo;
        this.reviewSendMemberNo = reviewSendMemberNo;
        this.reviewReceiveMemberNo = reviewReceiveMemberNo;
        this.reviewContent = reviewContent;
        this.reviewResign = reviewResign;
    }

    public void updateReviewResign(boolean b) {
        this.reviewResign= b;
    }
}
