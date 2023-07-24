package com.problemsolvingjava.validate.domain.dto;

import lombok.Data;

@Data
public class ResponseDto {
    private String result;
    private int time;
    private int memory;
}
