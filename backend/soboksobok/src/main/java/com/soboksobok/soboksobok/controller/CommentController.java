package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@Slf4j
//@RestController
//@CrossOrigin("*")
//@RequestMapping("/comment")
//@Api("댓글 Controller")
public class CommentController {
//    @Autowired
//    CommentService service;
//
//    @GetMapping("/{qna_id}")
//    @ApiOperation(value="전체 댓글",notes="전체 댓글을 보여줍니다.")
//    public ResponseEntity<List<CommentReqDto>> getAllComment(@PathVariable("qna_id") Long qna_id) throws Exception{
//        System.out.println("controller");
//        List<CommentReqDto> list=service.getAllComment(qna_id);
//        ResponseEntity<List<CommentReqDto>> res=new ResponseEntity(list, HttpStatus.OK);
//        log.info("댓글 개수 확인: "+list.size());
//        return res;
//    }
}
