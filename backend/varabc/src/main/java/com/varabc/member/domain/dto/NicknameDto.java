package com.varabc.member.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@ToString
@NoArgsConstructor
public class NicknameDto {
    private String memberNickname;

    @Builder
    public NicknameDto(String memberNickname) {
        this.memberNickname = memberNickname;
    }
}
