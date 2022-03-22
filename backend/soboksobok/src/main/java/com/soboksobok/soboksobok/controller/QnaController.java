package com.soboksobok.soboksobok.controller;

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
    @ApiOperation(value="전체 qna",notes="hihi")
    public ResponseEntity<List<QnaDto>> getAllQna() throws Exception{
        List<QnaDto> list=service.getAllQna();
        ResponseEntity<List<QnaDto>> res=new ResponseEntity(list, HttpStatus.OK);
        log.info("qna 개수 확인: "+list.size());
        return res;
    }

    @GetMapping("/mine")
    public ResponseEntity<List<QnaDto>> getMyQna(@RequestParam Long userId) throws Exception{
        List<QnaDto> list=service.getMyQna(userId);
        ResponseEntity<List<QnaDto>> res=new ResponseEntity(list, HttpStatus.OK);
        log.info("userId: "+userId);
        log.info("qna 개수 확인: "+list.size());
        return res;
    }
    @GetMapping("/{qna_id}")
    public ResponseEntity<QnaDto> getQnaDetail(@PathVariable("qna_id") Long qna_id) throws Exception{
        QnaDto qna=service.getQnaDetail(qna_id);
        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
        return res;
    }

    @GetMapping("/mine/{qna_id}")
    public ResponseEntity<QnaDto> getMyQnaDetail(@PathVariable("qna_id") Long qna_id, @RequestParam Long userId) throws Exception{
        QnaDto qna=service.getMyQnaDetail(qna_id,userId);
        List<CommentResDto> comments = qna.getComments(); //댓글
        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
        log.info("userId: "+userId);
        return res;
    }

    @PostMapping("/mine")
    @ApiOperation(value="qna 등록",notes="qna를 등록합니다.")
    public ResponseEntity<QnaDto> createMyQna(@RequestBody WriteQnaDto writeQnaDto) throws Exception{
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = (User)principal;
        QnaDto qnaDto=QnaDto.of(writeQnaDto);
        QnaDto qna=service.createMyQna(qnaDto,user);
        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
        log.info("userId: {}",user.getUserSeq());
        return res;
    }

    @DeleteMapping("/mine/{qna_id}")
    @ApiOperation(value="qna 삭제",notes="qna를 삭제합니다.")
    public ResponseEntity<String> deleteMyQna(@PathVariable("qna_id") Long qna_id, @RequestParam Long userId) throws Exception{
        String result=service.deleteMyQna(qna_id,userId);
        ResponseEntity<String> res=new ResponseEntity(result, HttpStatus.OK);
        log.info("qnaId: {} userId: {}",qna_id, userId);
        return res;
    }
}
