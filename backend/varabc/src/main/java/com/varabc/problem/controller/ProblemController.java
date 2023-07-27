package com.varabc.problem.controller;

import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.entity.ProblemEntity;
import com.varabc.problem.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<ProblemEntity> addProblem(@RequestBody ProblemDto problemDto){
    ProblemEntity savedProblemEntity = problemService.save(problemDto);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(savedProblemEntity);
    }
}
