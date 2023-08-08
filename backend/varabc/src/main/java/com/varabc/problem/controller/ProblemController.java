package com.varabc.problem.controller;

import com.varabc.problem.domain.dto.CheckUpdateDto;
import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.ProblemListDto;
import com.varabc.problem.exception.ProblemException;
import com.varabc.problem.service.ProblemService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
//@Controller
@Slf4j
@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    //crud
    private final ProblemService problemService;

    @GetMapping("/getList")
    public ResponseEntity<?> getList(){
        List<ProblemListDto> problemDtoList = problemService.getList();
        HttpStatus status;
        if(problemDtoList.size()==0){
            System.out.println("문제 없음");
            status= HttpStatus.NO_CONTENT;
        }else{
            status=HttpStatus.OK;
        }
        return new ResponseEntity<>(problemDtoList, status);
    }


    @GetMapping("/{problemNo}")
    public ResponseEntity<ProblemDto> getProblem(@PathVariable Long problemNo) {

        ProblemDto problemDto= problemService.getProblem(problemNo);
        HttpStatus status;
        if (problemDto == null) {
            status = HttpStatus.NOT_FOUND;
        }else{
            status= HttpStatus.OK;
        }
        return new ResponseEntity<>(problemDto, status);
    }

    @GetMapping("/")
    public String getIndexPage() {
        return "index";
    }
    @PostMapping("/")
    public ResponseEntity<?> createProblem(@ModelAttribute GetProblemDto getProblemDto) {
        System.out.println(getProblemDto.toString());
        try {
            problemService.createProblem(getProblemDto);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (IOException e) {
            log.info("ProblemController_createProblem_end: io exception");
            throw new ProblemException("cannot create");
        }
    }

    //수정 함수 3부분으로 구현. 지문, 테케는 s3 접근해서 수정해줘야하니깐.

    @GetMapping("/{problemNo}/update")
    public String getUpdatePage() {
        return "updateForm";
    }

    @PostMapping("/{problemNo}/update")
    public ResponseEntity<?> updateProblem(@PathVariable Long problemNo,
            @ModelAttribute GetProblemDto getProblemDto,
            @ModelAttribute CheckUpdateDto checkUpdateDto) {

        if (checkUpdateDto.isProblemUpdate()) {
            problemService.updateProblem(problemNo, getProblemDto);
        }
        if (checkUpdateDto.isProblemContentUpdate()) { //변경이 있을때
            try {
                problemService.updateProblemImage(problemNo, getProblemDto);
            } catch (IOException e) {
                log.info("ProblemController_updateProblem_updateProblemImage_end: io exception");
                throw new ProblemException("cannot update problemImage");
            }
        }
        if (checkUpdateDto.isTestCaseUpdate()) {
            try {
                problemService.updateTestCase(problemNo, getProblemDto);
            } catch (IOException e) {
                log.info("ProblemController_updateProblem_updateTestCase_end: io exception");
                throw new ProblemException("cannot update testcase");
            }
        }
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    @DeleteMapping("/{problemNo}")
    public ResponseEntity<?> deleteProblem(@PathVariable Long problemNo) {
        boolean rslt = problemService.deleteProblem(problemNo);
        if(rslt){
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }else{
            return new ResponseEntity<String>("failed", HttpStatus.NOT_FOUND);
        }
    }

}
