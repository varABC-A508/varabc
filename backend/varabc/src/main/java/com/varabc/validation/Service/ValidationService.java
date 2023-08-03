package com.varabc.validation.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.varabc.validation.domain.dto.ProblemRestrictionDto;
import com.varabc.validation.domain.dto.TestCaseDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
import com.varabc.validation.domain.entity.Submit;
import com.varabc.validation.domain.util.FileData;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface ValidationService {

    ValidationResultDto sendRequestValidation(String serverUrl, ValidateDto validateDto);
    public TestCaseDto getTestCaseDtoByProblemNo(long problemNo);
    public List<FileData> getUrlIntoText(List<String> files) throws MalformedURLException, IOException;

    public void saveValidationResult(ValidationResultDto validationResultDto, ValidateDto validateDto);

    ProblemRestrictionDto getProblemRestriction(long problemNo);
}
