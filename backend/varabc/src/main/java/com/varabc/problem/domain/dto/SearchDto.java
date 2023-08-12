package com.varabc.problem.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;


@Getter
@ToString
@NoArgsConstructor
public class SearchDto {
    private String keyword;
    private List<Integer> algoType;

    @Builder
    public SearchDto(String keyword, List<Integer> algoType) {
        this.keyword = keyword;
        this.algoType = algoType;
    }
}
