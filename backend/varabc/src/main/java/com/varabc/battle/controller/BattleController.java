package com.varabc.battle.controller;

import com.varabc.battle.config.NumberEncryptor;
import com.varabc.battle.service.BattleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            return  new ResponseEntity<>(encryptedData, status);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{memberNo}")
    public ResponseEntity<?> joinRoom(@PathVariable Long memberNo,@RequestBody String roomCode) {
        try{
        long competitionResultNo = encryptor.decrypt(String.valueOf(roomCode));
        battleService.joinRoom(memberNo, competitionResultNo);
        return new ResponseEntity<>(HttpStatus.OK);}
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

//    @GetMapping("/start")
//    public ResponseEntity<?> startBattle(@RequestBody StartBattleDto startBattleDto){
//        if(startBattleDto.getCompetitionTeam()==1){
//            //1팀으로 등록학고 정보 넘겨주는 식으로
////            다른 url을 리턴해서 redirect 시킨다
//        }else{
//            //2팀으로 등록하고 정보 넘겨주는 식으로
//        }
//    }

//    @PostMapping("/submit")
//    public ResponseEntity<?> submit(@RequestBody SubmitBattleDto submitBattleDto){}


}
