package com.varabc.problem.controller;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseListDto;
import com.varabc.problem.service.ProblemService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    //crud
    private final ProblemService problemService;


    @PostMapping("/")
    public String createProblem(@ModelAttribute ProblemDto problemDto) throws IOException {
        problemService.createProblem(problemDto);
        return "index";
    }

    @GetMapping("/{problemNo}")
    public ProblemDto getProblem(@PathVariable Long problemNo) {
        return problemService.getProblem(problemNo);
    }

    @PutMapping("/{problemNo}")
    public void updateProblem(@PathVariable Long problemNo,@RequestBody ProblemDto problemDto) {
        problemService.updateProblem(problemNo,problemDto);
    }

//    @PutMapping("/{problemNo}/testcase")
//    public void updateTestcase(@PathVariable Long problemNo,@ModelAttribute TestcaseListDto testcaseListDto ) throws IOException {
//        System.out.println(testcaseListDto.toString());
//        problemService.updateTestcase(problemNo,testcaseListDto);
//    }

    @GetMapping("/{problemNo}/testcase")
    public String showUploadForm(@PathVariable Long problemNo, Model model) {
        model.addAttribute("problemNo", problemNo);
        model.addAttribute("testcaseListDto", new TestcaseListDto());
        return "uploadform";
    }
@PostMapping("/{problemNo}/testcase")
public String showUploadForm(@PathVariable Long problemNo, @ModelAttribute TestcaseListDto testcaseListDto)
        throws IOException {
//    model.addAttribute("problemNo", problemNo);
//    model.addAttribute("testcaseListDto", new TestcaseListDto());
    System.out.println(testcaseListDto.toString());
    problemService.updateTestcase(problemNo,testcaseListDto);
    return "uploadform";  // Assuming "uploadform.html" is the Thymeleaf template
}
    @DeleteMapping("/{problemNo}")
    public void deleteProblem(@PathVariable Long problemNo) {
        problemService.deleteProblem(problemNo);
        System.out.println("deleted");
    }

}
