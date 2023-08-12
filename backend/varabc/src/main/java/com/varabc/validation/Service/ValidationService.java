package com.varabc.validation.Service;

import com.varabc.battle.domain.dto.BattleMemberDto;
import com.varabc.battle.domain.dto.FinalResultListDto;
import com.varabc.battle.domain.dto.ResultDto;
import com.varabc.battle.domain.dto.SubmitBattleDto;
import com.varabc.mypage.domain.dto.MyPageSubmitDto;
import com.varabc.validation.domain.dto.ProblemRestrictionDto;
import com.varabc.validation.domain.dto.SubmitDto;
import com.varabc.validation.domain.dto.TestCaseDto;
import com.varabc.validation.domain.dto.ValidateDto;
import com.varabc.validation.domain.dto.ValidationResultDto;
import com.varabc.validation.domain.util.FileData;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

public interface ValidationService {

    ValidationResultDto sendRequestValidation(String serverUrl, ValidateDto validateDto);

    public TestCaseDto getTestCaseDtoByProblemNo(Long problemNo);

    public List<FileData> getUrlIntoText(List<String> files)
            throws MalformedURLException, IOException;

    public void saveValidationResult(ValidationResultDto validationResultDto,
            ValidateDto validateDto,
            int mode, Long competitionResultNo, int order);

    ProblemRestrictionDto getProblemRestriction(Long problemNo);

    ResultDto submitBattle(SubmitBattleDto submitBattleDto, Long competitionResultNo, Long memberNo)
            throws IOException;

    FinalResultListDto getFinalResult(Long competitionResultNo, BattleMemberDto battleMemberDto);

    List<MyPageSubmitDto> getSubmits(Long memberNo, int mode);

    SubmitDto getSubmit(Long submitNo);
}
