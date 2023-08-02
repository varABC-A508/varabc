package com.varabc.validation.mapper;


import com.varabc.validation.domain.dto.TestCaseDto;
import com.varabc.validation.domain.dto.ValidateDataDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.util.FileData;
import java.util.List;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public class ValidationMapper {
        //testCaseEntity를 testCaseDto로 변환해기

        public static TestCaseDto testCaseListToDto(List<String> inputFiles, List<String> outputFiles) {
            return TestCaseDto.builder()
                    .inputFiles(inputFiles)
                    .outputFiles(outputFiles)
                    .build();
        }
        //validateDto를  validateDataDto+testCaseDto와 함께 빌드
        public static ValidateDto mapToValidateDto(ValidateDataDto validateDataDto, List<FileData> inputFiles,
                List<FileData> outputFiles){
            return ValidateDto.builder()
                    .code(validateDataDto.getCode())
                    .timeLimit(validateDataDto.getTimeLimit())
                    .memoryLimit(validateDataDto.getMemoryLimit())
                    .inputFiles(inputFiles)
                    .outputFiles(outputFiles)
                    .build();
        }
}
