package com.varabc.problem.controller;
import com.varabc.problem.domain.dto.*;
import com.varabc.problem.exception.ProblemException;
import com.varabc.problem.service.ProblemService;
import com.varabc.problem.service.SearchService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    //crud
    private final ProblemService problemService;
    private final SearchService searchService;
    public boolean allSearchInputNull(SearchDto searchDto){
        if (searchDto.getKeyword()==null&& searchDto.getAlgoType()==null){return true;}
        return false;
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody SearchDto searchDto) {
        if (allSearchInputNull(searchDto)){return getList();}
        if (searchDto.getKeyword()==null ||searchDto.getKeyword().equals("")){
            return new ResponseEntity<>(searchService.searchProblemsOnlyAlgorithmType(searchDto.getAlgoType()),HttpStatus.OK);
        }
        if (searchDto.getAlgoType()==null){
            return new ResponseEntity<>(searchService.searchProblemsOnlyKey(searchDto.getKeyword()),HttpStatus.OK);
        }
        return new ResponseEntity<>(searchService.searchProblems(searchDto.getKeyword(), searchDto.getAlgoType()),HttpStatus.OK);
    }

    @PostMapping("/searchByNo")
    public ResponseEntity<?> searchByNo(@RequestBody SearchDto searchDto) {
        if (allSearchInputNull(searchDto)){return getList();}
        if (searchDto.getKeyword()==null||searchDto.getKeyword().equals("")){
            return new ResponseEntity<>(searchService.searchProblemsOnlyAlgorithmType(searchDto.getAlgoType()),HttpStatus.OK);
        }
        long problemNo=Long.parseLong(searchDto.getKeyword());
        if (searchDto.getAlgoType()==null){
            return new ResponseEntity<>(searchService.searchProblemsOnlyProblemNo(problemNo),HttpStatus.OK);
        }
        return new ResponseEntity<>(searchService.searchProblemsByNo(problemNo, searchDto.getAlgoType()),HttpStatus.OK);
    }

    @GetMapping("/getList")
    public ResponseEntity<?> getList() {
        List<ProblemListDto> problemDtoList = problemService.getList();
        HttpStatus status;
        if (problemDtoList.size() == 0) {
            System.out.println("문제 없음");
            status = HttpStatus.NO_CONTENT;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(problemDtoList, status);
    }


    @GetMapping("/{problemNo}/admin")
    public ResponseEntity<ProblemDto> getProblem(@PathVariable Long problemNo) {
        //관리자페이지
        ProblemDto problemDto = problemService.getProblem(problemNo);
        HttpStatus status;
        if (problemDto == null) {
            status = HttpStatus.NOT_FOUND;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(problemDto, status);
    }

    @GetMapping("/{problemNo}")
    public ResponseEntity<?> getProblemPublic(@PathVariable Long problemNo) {
        //공개 문제. 비공개테케 출력 안함. 문제의 일부 정보들만 출력.
        PublicProblemDto publicProblemDto = problemService.getProblemPublic(problemNo);
        HttpStatus status;
        if (publicProblemDto == null) {
            status = HttpStatus.NOT_FOUND;
        } else {
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(publicProblemDto, status);
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


    @PostMapping("/{problemNo}/update")
    public ResponseEntity<?> updateProblem(@PathVariable Long problemNo,
            @ModelAttribute GetProblemDto getProblemDto,
            @ModelAttribute CheckUpdateDto checkUpdateDto) {
        if (checkUpdateDto.isProblemUpdate()) {
            System.out.println("1");
            problemService.updateProblem(problemNo, getProblemDto);
        }
        if (checkUpdateDto.isProblemContentUpdate()) { //변경이 있을때
            try {
                System.out.println("2");
                problemService.updateProblemImage(problemNo, getProblemDto);
            } catch (IOException e) {
                log.info("ProblemController_updateProblem_updateProblemImage_end: io exception");
                throw new ProblemException("cannot update problemImage");
            }
        }
        if (checkUpdateDto.isTestCaseUpdate()) {
            try {
                System.out.println("3");
                problemService.updateTestCase(problemNo, getProblemDto);
            } catch (IOException e) {
                log.info("ProblemController_updateProblem_updateTestCase_end: io exception");
                throw new ProblemException("cannot update testcase");
            }
        }
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    @PatchMapping("/{problemNo}/delete")
    public ResponseEntity<?> deleteProblem(@PathVariable Long problemNo) {
        boolean rslt = problemService.deleteProblem(problemNo);
        if (rslt) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("failed", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getRandomProblem")
    public ResponseEntity<?> getRandomProblem(@RequestBody RandomProblemDto randomProblemDto) {
        Long problemNo = problemService.getRandomProblem(randomProblemDto);
        if (problemNo != null) {
            return new ResponseEntity<>(problemNo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
