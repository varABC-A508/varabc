package com.varabc.problem.controller;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

//    @PostMapping("/")
//    public ResponseEntity<ProblemEntity> addProblem(@RequestBody ProblemDto problemDto) {
//        ProblemEntity savedProblemEntity = problemService.save(problemDto);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(savedProblemEntity);
//    }

    @PostMapping("/")
    public ResponseEntity<Void> createProblem(@RequestBody ProblemDto problemDto) {
        problemService.createProblem(problemDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{problemNo}")
    public ProblemDto getProblem(@PathVariable Long problemNo) {
        return problemService.getProblem(problemNo);
    }

    @PutMapping("/{problemNo}")
    public void updateProblem(@PathVariable Long problemNo,@RequestBody ProblemDto problemDto) {
        problemService.updateProblem(problemNo,problemDto);
    }


    @DeleteMapping("/{problemNo}")
    public void deleteProblem(@PathVariable Long problemNo) {
        problemService.deleteProblem(problemNo);
        System.out.println("deleted");
    }


}
