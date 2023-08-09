package com.varabc.battle.controller;

import com.varabc.battle.config.NumberEncryptor;
import com.varabc.battle.domain.dto.ResultDto;
import com.varabc.battle.domain.dto.StartBattleDto;
import com.varabc.battle.domain.dto.SubmitBattleDto;
import com.varabc.battle.service.BattleService;
import com.varabc.validation.Service.ValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

    //4인방, 내 정보 넣어서. 둘둘 나눠서.
    //디비에 저장.
    @PostMapping("/newRoom/{memberNo}")
    public ResponseEntity<?> createRoom(@PathVariable Long memberNo) {
        Long roomCode = battleService.createRoom(memberNo);
        HttpStatus status;
        if (roomCode != null) {
            status = HttpStatus.OK;
        } else {
            status = HttpStatus.CONFLICT;
        }
        try {
            // 수 암호화
            String encryptedData = encryptor.encrypt(roomCode);
            return new ResponseEntity<>(encryptedData, status);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{memberNo}")
    public ResponseEntity<?> joinRoom(@PathVariable Long memberNo, @RequestBody String roomCode) {
        try {
            long competitionResultNo = encryptor.decrypt(String.valueOf(roomCode));
            battleService.joinRoom(memberNo, competitionResultNo);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/start")
    public ResponseEntity<?> startBattle(@RequestBody StartBattleDto startBattleDto){
        //일단 다시 입력된 정보로 db 업데이트.
        battleService.updateBattleInfoToFinal(startBattleDto);
        if(startBattleDto.getCompetitionTeam()==1){
            //1팀으로 등록학고 정보 넘겨주는 식으로
//            다른 url을 리턴해서 redirect 시킨다
        }else{
            //2팀으로 등록하고 정보 넘겨주는 식으로
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody SubmitBattleDto submitBattleDto) {
        try {
            Long competitionResultNo = encryptor.decrypt(submitBattleDto.getBattleCode());
            ResultDto resultDto = validationService.submitBattle(submitBattleDto,
                    competitionResultNo);
            String resultMessage;
            //resultDto.getResult()에 따라, 1이 정답, 2가  시간초과, 3이 메모리 초과, 4가 오답. 따라서 다른 리턴을 보여야함.
            //1인 경우, 승패 기록을 해줘야한다.
            if (resultDto.getResult() == 1) {
                battleService.endBattle(submitBattleDto.getTeam(), competitionResultNo);
                // 얘는 여기서 새 페이지로 리다이렉트.
            }
            return new ResponseEntity<>(resultDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
