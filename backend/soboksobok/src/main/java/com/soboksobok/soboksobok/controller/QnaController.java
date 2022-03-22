package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.common.ApiResponse;
import com.soboksobok.soboksobok.domain.Qna;
import com.soboksobok.soboksobok.domain.dto.CommentResDto;
import com.soboksobok.soboksobok.domain.dto.QnaDto;
import com.soboksobok.soboksobok.domain.dto.WriteQnaDto;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.service.QnaService;
import com.soboksobok.soboksobok.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/qna")
@Api("Qna Controller")
public class QnaController {
    @Autowired
    QnaService service;
    @Autowired
    UserService userService;

    @GetMapping
    @ApiOperation(value="전체 qna 조회",notes="전체 qna를 불러옵니다.(user 상관없이 DB에 있는 모든 qna 조회)")
    public ResponseEntity<List<QnaDto>> getAllQna() throws Exception{
        List<QnaDto> list=service.getAllQna();
        ResponseEntity<List<QnaDto>> res=new ResponseEntity(list, HttpStatus.OK);
        log.info("qna 개수 확인: "+list.size());
        return res;
    }

    @GetMapping("/mine")
    @ApiOperation(value="나의 qna 조회",notes="내가 작성한 모든 qna를 조회합니다.")
    public ResponseEntity<List<QnaDto>> getMyQna(@RequestParam Long userId) throws Exception{
        List<QnaDto> list=service.getMyQna(userId);
        ResponseEntity<List<QnaDto>> res=new ResponseEntity(list, HttpStatus.OK);
        log.info("userId: "+userId);
        log.info("qna 개수 확인: "+list.size());
        return res;
    }
    @GetMapping("/{qna_id}")
    @ApiOperation(value="qna 상세 조회",notes="qna를 상세 조회합니다.(user 상관없이)")
    public ResponseEntity<QnaDto> getQnaDetail(@PathVariable("qna_id") Long qna_id) throws Exception{
        QnaDto qna=service.getQnaDetail(qna_id);
        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
        return res;
    }

    @GetMapping("/mine/{qna_id}")
    @ApiOperation(value="나의 qna 상세 조회",notes="내가 등록한 qna를 상세 조회합니다.")
    public ApiResponse getMyQnaDetail(@PathVariable("qna_id") Long qna_id, @RequestParam Long userId) throws Exception{
        QnaDto qna=service.getMyQnaDetail(qna_id,userId);
        List<CommentResDto> comments = qna.getComments(); //댓글
//        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
//        log.info("userId: "+userId);
        return ApiResponse.success("success",qna);
    }

    @PostMapping("/mine")
    @ApiOperation(value="qna 등록",notes="qna를 등록합니다.")
    public ApiResponse createMyQna(@RequestBody WriteQnaDto dto, @RequestParam("userId") Long user_seq) throws Exception{
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = (User)principal;
        // 받은 아이디와 로그인 한 유저의 아이디가 같을 때만 실행
        // 로그인 한 유저 받아야 함. 1은 임시값
//        if(user.getUserSeq()!=user_id) return ApiResponse.fail();
        if(Long.valueOf(1)!=user_seq) return ApiResponse.fail();
        QnaDto qnaDto=QnaDto.of(dto);
        QnaDto qna=service.createMyQna(qnaDto,user_seq);
        return ApiResponse.success("success",qna);
    }

    @DeleteMapping("/mine/{qna_id}")
    @ApiOperation(value="qna 삭제",notes="qna를 삭제합니다.")
    public ApiResponse deleteMyQna(@PathVariable("qna_id") Long qna_id, @RequestParam("userId") Long userId) throws Exception{
        String result=service.deleteMyQna(qna_id,userId);
        return ApiResponse.success("success",result);
    }

    @PatchMapping("/mine/{qna_id}")
    @ApiOperation(value="qna 수정",notes="qna를 수정합니다. content와 title에 수정된 내용을 넣어줍니다. 만약, 수정된 내용이 없다면 원래 내용을 넣어주세요.")
    public  ApiResponse updateMyQna(@PathVariable("qna_id") Long qna_id, @RequestParam("userId") Long user_seq, @RequestBody WriteQnaDto dto) throws Exception{
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = (User)principal; // 현재 로그인 한 유저
        // 받은 아이디와 로그인 한 유저의 아이디가 같을 때만 실행
        // 로그인 한 유저 받아야 함. 1은 임시값
//        if(user.getUserSeq()!=user_id) return ApiResponse.fail();
        if(Long.valueOf(1)!=user_seq) return ApiResponse.fail();
        QnaDto qnaDto=QnaDto.of(dto);
        String result=service.updateMyQna(qna_id,user_seq,qnaDto);
        return ApiResponse.success("success",result);
    }
}
