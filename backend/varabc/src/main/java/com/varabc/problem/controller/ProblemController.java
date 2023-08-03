package com.varabc.problem.controller;

import com.varabc.problem.domain.dto.GetProblemDto;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestCaseListDto;
import com.varabc.problem.service.ProblemService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@Controller
@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    //crud
    private final ProblemService problemService;


    @PostMapping("/")
    public String createProblem(@ModelAttribute GetProblemDto getProblemDto) throws IOException {
        System.out.println(getProblemDto.toString());
        problemService.createProblem(getProblemDto);
        return "index";
    }

//    @GetMapping("/{problemNo}")
//    public ProblemDto getProblem(@PathVariable Long problemNo) {
//        return problemService.getProblem(problemNo);
//    }
//
//    @PutMapping("/{problemNo}")
//    public void updateProblem(@PathVariable Long problemNo, @RequestBody ProblemDto problemDto) {
//        problemService.updateProblem(problemNo, problemDto);
//    }


//    @GetMapping("/{problemNo}/testcase") //테스트용으로 만든것
//    public String showUploadForm(@PathVariable Long problemNo, Model model) {
//        model.addAttribute("problemNo", problemNo);
//        model.addAttribute("testcaseListDto", new TestcaseListDto());
//        return "uploadform";
//    }

//    @PutMapping("/{problemNo}/testcase")
//    public void updateTestcase(@PathVariable Long problemNo,
//            @ModelAttribute TestcaseListDto testcaseListDto) throws IOException {
//        System.out.println(testcaseListDto.toString());
//        problemService.updateTestcase(problemNo, testcaseListDto);
//    }

//    @PostMapping("/{problemNo}/testcase") //이걸 put으로 해야할지, post로 해야할지 고민입니다.
//    //사실상 기존 값의 업데이트가 아닌, 기존 값들을 지우고 새로 등록하는 과정이기 때문에 post여야 하지 않나라는 고민입니다.
//    public String showUploadForm(@PathVariable Long problemNo,
//            @ModelAttribute TestCaseListDto testcaseListDto)
//            throws IOException {
//        System.out.println(testcaseListDto.toString());
//        problemService.updateTestcase(problemNo, testcaseListDto);
//        return "uploadform";
//    }
//
//    @DeleteMapping("/{problemNo}")
//    public void deleteProblem(@PathVariable Long problemNo) {
//        problemService.deleteProblem(problemNo);
//        System.out.println("deleted");
//    }

}
