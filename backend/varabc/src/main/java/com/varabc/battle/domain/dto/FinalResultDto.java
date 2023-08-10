package com.varabc.battle.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class FinalResultDto {
    //팀원 정보 (양팀) 아마 이메일?
    //경기 결과 (걸린 시간, 우승팀, 사용 메모리, 언어?)
    //이 경기에서 제출된 모든 결과들 담은 dto 를 리스트로 갖고 있자.
    //우승팀
    String memberEmail;
    String submitStatus;
    int submitUsedMemory;
    double submitUsedTime;
    String submitLanguage;
    String submitTime;


    @Builder
    public FinalResultDto(String memberEmail, String submitStatus, int submitUsedMemory,
            double submitUsedTime, String submitLanguage, String submitTime) {
        this.memberEmail = memberEmail;
        this.submitStatus = submitStatus;
        this.submitUsedMemory = submitUsedMemory;
        this.submitUsedTime = submitUsedTime;
        this.submitLanguage = submitLanguage;
        this.submitTime = submitTime;
    }
}
