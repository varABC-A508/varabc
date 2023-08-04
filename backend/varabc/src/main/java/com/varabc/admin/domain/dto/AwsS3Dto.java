package com.varabc.admin.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class AwsS3Dto {
    private String key;
    private String path;


    @Builder
    public AwsS3Dto(String key, String path) {
        this.key = key;
        this.path = path;
    }

}
