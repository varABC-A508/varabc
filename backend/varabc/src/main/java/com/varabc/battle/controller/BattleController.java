package com.varabc.battle.controller;

import com.varabc.battle.config.NumberEncryptor;
import com.varabc.battle.domain.dto.BattleInfoDto;
import com.varabc.battle.domain.dto.BattleMemberDto;
import com.varabc.battle.domain.dto.BattleUrlDto;
import com.varabc.battle.domain.dto.FinalResultListDto;
import com.varabc.battle.domain.dto.ResultDto;
import com.varabc.battle.domain.dto.ReviewDto;
import com.varabc.battle.domain.dto.StartBattleDto;
import com.varabc.battle.domain.dto.SubmitBattleDto;
import com.varabc.battle.service.BattleService;
import com.varabc.validation.Service.ValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/battle")
@RequiredArgsConstructor
public class BattleController {

    private final BattleService battleService;
    private final NumberEncryptor encryptor;
    private final ValidationService validationService;

    @PostMapping("/newRoom/{memberNo}")
    public ResponseEntity<?> createRoom(@PathVariable Long memberNo) {
        //얘가 방만들고 방 코드 암호화해서 리턴하는거.
        Long roomCode = battleService.createRoom(memberNo);
        HttpStatus status;
        if (roomCode != null) {
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.CONFLICT;
            return new ResponseEntity<>(status);
        }
        try {
            // 수 암호화
            String encryptedData = encryptor.encrypt(roomCode);
            String url = "/battle/join/" + encryptedData;
            return new ResponseEntity<>(url, status);
            //위 리턴값에 /멤버no 붙여서 접근하면 됨. // //

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{memberNo}/{roomCode}")
    public ResponseEntity<?> joinRoom(@PathVariable Long memberNo, @PathVariable String roomCode) {
        //생성된 방에 초대. 이미 있는 사람? 그럼 못들어옴요. 4명 있는 방? 그럼 못들어옴요.
        String url = "";
        HttpStatus status;
        try {
            //이 링크로 타고 들어와서 join을 마쳤다면 대기방으로 redirect 시켜야.
            Long competitionResultNo = encryptor.decrypt(roomCode);

            if (battleService.joinRoom(memberNo, competitionResultNo)) {
                //참여
                //대기방 url로 이동.
                url = "join";
                status = HttpStatus.OK;
            } else {
                //그대로 대기.
                url = "failed";
                status = HttpStatus.NOT_ACCEPTABLE;
            }
            return new ResponseEntity<>(url, status);
        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(url, status);
        }

    }


    @PostMapping("/start/{roomCode}")
    public ResponseEntity<?> startBattle(@PathVariable String roomCode,
            @RequestBody StartBattleDto startBattleDto) {
        //일단 다시 입력된 정보로 db 업데이트.
        Long competitionResultNo = null;
        HttpStatus status = null;
        try {
            competitionResultNo = encryptor.decrypt(roomCode);
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
        }
        battleService.updateBattleInfoToFinal(competitionResultNo, startBattleDto);

        BattleUrlDto battleUrlDto = battleService.getBattleUrl(startBattleDto.getCompetitionTeam(),
                roomCode, startBattleDto.getProblemNo());

        return new ResponseEntity<>(battleUrlDto, status);
        //경로 두개 보냄.
    }

    @PostMapping("/game/{problemNo}/{roomCode}/{team}")
    public ResponseEntity<?> getBattle(@PathVariable Long problemNo, @PathVariable String roomCode,
            @PathVariable int team, @RequestBody StartBattleDto startBattleDto) {
        //이게 배틀 시작 페이지. 여기에서 문제 정보 리턴해줘야한다. 멤버 정보도 리턴?
//        멤버 메일이랑, 문제 정보랑, 배틀 코드 리턴.
        BattleInfoDto battleInfoDto = battleService.getBattleInfo(String.valueOf(roomCode),
                startBattleDto);
        return new ResponseEntity<>(battleInfoDto, HttpStatus.OK);
    }


    @PostMapping("/submit/{roomCode}/{memberNo}")
    public ResponseEntity<?> submit(@RequestBody SubmitBattleDto submitBattleDto,
            @PathVariable Long memberNo) {
        try {
            Long competitionResultNo = encryptor.decrypt(submitBattleDto.getBattleCode());
            ResultDto resultDto = validationService.submitBattle(submitBattleDto,
                    competitionResultNo, memberNo);
            String redirectURL = null;
            //1인 경우, 승패 기록을 해줘야한다.
            if (resultDto.getResult() == 1) {
                battleService.endBattle(submitBattleDto.getTeam(), competitionResultNo);
            }
            return new ResponseEntity<>(resultDto, HttpStatus.OK); //여기에서 newPage로 넘어감요.
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/finalResult/{roomCode}")
    public ResponseEntity<?> getFinalResult(@PathVariable String roomCode, @RequestBody
    BattleMemberDto battleMemberDto) {
        //경기 결과 리턴.
        Long competitionResultNo = null;
        HttpStatus status = null;
        try {
            competitionResultNo = encryptor.decrypt(roomCode);
            status = HttpStatus.OK;
        } catch (Exception e) {
//            throw new RuntimeException(e);
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(status);
        }
        FinalResultListDto finalResultListDto = validationService.getFinalResult(
                competitionResultNo, battleMemberDto);
        if (finalResultListDto == null) {
            status = HttpStatus.CONFLICT;
            return new ResponseEntity<>(status);
        }
        return new ResponseEntity<>(finalResultListDto, status);
    }

    @PostMapping("/review/{roomCode}")
    public ResponseEntity<?> createReview(@PathVariable String roomCode,
            @RequestBody ReviewDto reviewDto) {
        Long competitionResultNo = null;
        HttpStatus status = null;
        try {
            competitionResultNo = encryptor.decrypt(roomCode);
            status = HttpStatus.OK;
        } catch (Exception e) {
//            throw new RuntimeException(e);
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(status);
        }
        boolean request = battleService.createReview(competitionResultNo, reviewDto);
        if (!request) {
            status = HttpStatus.CONFLICT;
        }
        return new ResponseEntity<>(status);
    }



}
