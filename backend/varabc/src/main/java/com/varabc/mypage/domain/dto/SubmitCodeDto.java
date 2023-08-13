package com.varabc.mypage.domain.dto;

import com.varabc.validation.domain.dto.SubmitDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class SubmitCodeDto {

    String nickname;
    int memberExp;
    String problemTitle;
    SubmitDto submitDto;

    @Builder
    public SubmitCodeDto(String nickname, int memberExp, String problemTitle, SubmitDto submitDto) {
        this.nickname = nickname;
        this.memberExp = memberExp;
        this.problemTitle = problemTitle;
        this.submitDto = submitDto;
    }
}
