package com.varabc.problem.controller;

import com.varabc.problem.domain.dto.CheckUpdateDto;
import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.service.ProblemService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@Controller
@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    //crud
    private final ProblemService problemService;

    @GetMapping("/{problemNo}")
    public ProblemDto getProblem(@PathVariable Long problemNo) {
        return problemService.getProblem(problemNo);
    }

    @GetMapping("/")
    public String getIndexPage() {
        return "index";
    }
    @PostMapping("/")
    public String createProblem(@ModelAttribute GetProblemDto getProblemDto) throws IOException {
        System.out.println(getProblemDto.toString());
        problemService.createProblem(getProblemDto);
        return "index";
    }

    //수정 함수 3부분으로 구현. 지문, 테케는 s3 접근해서 수정해줘야하니깐.

    @GetMapping("/{problemNo}/update")
    public String getUpdatePage() {
        return "updateForm";
    }

    @PostMapping("/{problemNo}/update")
    public String updateProblem(@PathVariable Long problemNo,
            @ModelAttribute GetProblemDto getProblemDto,
            @ModelAttribute CheckUpdateDto checkUpdateDto) throws IOException {

        if (checkUpdateDto.isProblemUpdate()) {
            problemService.updateProblem(problemNo, getProblemDto);
        }
        if (checkUpdateDto.isProblemContentUpdate()) { //변경이 있을때
            problemService.updateProblemImage(problemNo, getProblemDto);
        }
        if (checkUpdateDto.isTestCaseUpdate()) {
            problemService.updateTestCase(problemNo, getProblemDto);
        }
        return "index";
    }


    @DeleteMapping("/{problemNo}")
    public void deleteProblem(@PathVariable Long problemNo) {
        problemService.deleteProblem(problemNo);
        System.out.println("deleted");
    }

}
