package com.varabc.problem.controller;

import com.varabc.admin.controller.AwsS3Controller;
import com.varabc.problem.domain.dto.ProblemDto;
import com.varabc.problem.domain.dto.TestcaseDto;
import com.varabc.problem.service.ProblemService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
//@Controller
//@RequestMapping("/problem")
//@RequiredArgsConstructor
public class ProblemController {

    //crud
    private final ProblemService problemService;
    private final AwsS3Controller awsS3Controller;

//    @PostMapping("/")
//    public ResponseEntity<ProblemEntity> addProblem(@RequestBody ProblemDto problemDto) {
//        ProblemEntity savedProblemEntity = problemService.save(problemDto);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(savedProblemEntity);
//    }

    @GetMapping("/")
    public String problemForm() {
        return "index";
    }
    @PostMapping("/")
    public String createProblem(@ModelAttribute ProblemDto problemDto) throws IOException {
        List<TestcaseDto> testcaseDtoList = new ArrayList<TestcaseDto>();
        if (!problemDto.getTestcaseInputList().isEmpty()) {
//            String inputUrl = awsS3Controller.upload(problemDto.getTestcaseInputList().get(0));
//            System.out.println(inputUrl);
            for (int i = 0; i < problemDto.getTestcaseInputList().size(); i++) {//이거 여기다 둘껀지, service로 보낼건지
                //input 하나 빼서 s3에 저장, 그리고 그 주소 반환필요. string으로.
                String inputUrl = awsS3Controller.upload(problemDto.getTestcaseInputList().get(i));
                String outputUrl = awsS3Controller.upload(problemDto.getTestcaseOutputList().get(i));
//                boolean isPublic = problemDto.getTestcasePublicList().get(i);
//                TestcaseDto testcaseDto= new TestcaseDto(inputUrl,outputUrl,isPublic);
                // 공개 여부를 프론트에서 어떻게 넘길껀지에 따라 다르니까
                TestcaseDto testcaseDto= new TestcaseDto(inputUrl,outputUrl,false);
                testcaseDtoList.add(testcaseDto);
            }

        }
        problemService.createProblem(problemDto,testcaseDtoList );
        return "index";
    }
//    @PostMapping("/")
//    public ResponseEntity<Void> createProblem(@RequestBody ProblemDto problemDto) {
//        problemService.createProblem(problemDto);
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

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
