package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class FinalResultDto {
    String nickname;
    String submitStatus;
    int submitUsedMemory;
    double submitUsedTime;
    String submitLanguage;
    String submitTime;


    @Builder
    public FinalResultDto(String nickname, String submitStatus, int submitUsedMemory,
            double submitUsedTime, String submitLanguage, String submitTime) {
        this.nickname = nickname;
        this.submitStatus = submitStatus;
        this.submitUsedMemory = submitUsedMemory;
        this.submitUsedTime = submitUsedTime;
        this.submitLanguage = submitLanguage;
        this.submitTime = submitTime;
    }
}
