package com.varabc.battle.domain.entity;

import com.varabc.battle.domain.dto.StartBattleDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Table(name = "competition_result")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@ToString
public class CompetitionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long competitionResultNo;

    @Column(name = "competition_result_t1_m1_no", nullable = false)
    private Long competitionResultT1M1No;

    @Column(name = "competition_result_t1_m2_no")
    private Long competitionResultT1M2No;

    @Column(name = "competition_result_t2_m1_no")
    private Long competitionResultT2M1No;

    @Column(name = "competition_result_t2_m2_no")
    private Long competitionResultT2M2No;

    @Column(name = "competition_result_member_count", nullable = false, columnDefinition = "default 0")
    private int competitionResultMemberCount;

    @Column(name = "competition_result_record", nullable = false, columnDefinition = "default 0")
    private int competitionResultRecord;

    @Column(name = "competition_result_resign", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean competitionResultResign;

    public void updateMember(int count) {
        this.competitionResultMemberCount = count + 1;
    }

    public boolean search(Long memberNo) {
        return !Objects.equals(this.competitionResultT1M1No, memberNo)
                && !Objects.equals(this.competitionResultT1M2No, memberNo)
                && !Objects.equals(this.competitionResultT2M1No, memberNo)
                && !Objects.equals(this.competitionResultT2M2No, memberNo);
    }

    public void updateResult(int team) {
        this.competitionResultRecord = team;
    }
    @Builder
    public CompetitionResult(Long competitionResultT1M1No,
            Long competitionResultT1M2No, Long competitionResultT2M1No,
            Long competitionResultT2M2No,
            int competitionResultMemberCount, int competitionResultRecord,
            boolean competitionResultResign) {
        this.competitionResultT1M1No = competitionResultT1M1No;
        this.competitionResultT1M2No = competitionResultT1M2No;
        this.competitionResultT2M1No = competitionResultT2M1No;
        this.competitionResultT2M2No = competitionResultT2M2No;
        this.competitionResultMemberCount = competitionResultMemberCount;
        this.competitionResultRecord = competitionResultRecord;
        this.competitionResultResign = competitionResultResign;
    }


    public void updateCompetition(StartBattleDto startBattleDto) {
        this.competitionResultT1M1No = startBattleDto.getCompetitionResultT1M1No();
        this.competitionResultT1M2No = startBattleDto.getCompetitionResultT1M2No();
        this.competitionResultT2M1No = startBattleDto.getCompetitionResultT2M1No();
        this.competitionResultT2M2No = startBattleDto.getCompetitionResultT2M2No();
    }

}
