package com.varabc.validation.Service;

import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;

public interface ValidationService {

    ValidationResultDto sendRequestValidation(String serverUrl, ValidateDto validateDto);
}
