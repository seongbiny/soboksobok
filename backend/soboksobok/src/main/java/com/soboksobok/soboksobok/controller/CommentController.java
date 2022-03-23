package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.common.ApiResponse;
import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/comment")
@Api("댓글 Controller")
public class CommentController {
    @Autowired
    CommentService service;

    @PostMapping("/{qna_id}")
    @ApiOperation(value="댓글 작성",notes="댓글을 작성합니다.")
    public ResponseEntity createComment(@PathVariable("qna_id") Long qna_id,@RequestBody CommentReqDto comment) throws Exception{
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = (User)principal; // 현재 로그인 한 유저
        // 로그인 한 유저 받아야 함. 1은 임시값
        return ResponseEntity.ok(service.createComment(Long.valueOf(1),qna_id,comment));
    }

    @DeleteMapping("/{comment_id}")
    @ApiOperation(value="댓글 삭제",notes="댓글을 삭제합니다.")
    public ApiResponse deleteComment(@PathVariable("comment_id") Long comment_id,@RequestParam("user_seq") Long user_seq) throws Exception{
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = (User)principal; // 현재 로그인 한 유저
        // 받은 아이디와 로그인 한 유저의 아이디가 같을 때만 실행

        // 로그인 한 유저 받아야 함. 1은 임시값
//        if(user.getUserSeq()!=user_id) return ApiResponse.fail();
        if(Long.valueOf(1)!=user_seq) return ApiResponse.fail();
        String result=service.deleteComment(comment_id);
        return ApiResponse.success("success",result);
    }

    @PatchMapping("/{comment_id}")
    @ApiOperation(value="댓글 수정",notes="댓글을 수정합니다. 'comment_created_at'는 원래 값으로 넣어주세요.'")
    public ApiResponse deleteComment(@PathVariable("comment_id") Long comment_id,@RequestParam("user_seq") Long user_seq,@RequestBody CommentReqDto dto) throws Exception{
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = (User)principal; // 현재 로그인 한 유저
        // 받은 아이디와 로그인 한 유저의 아이디가 같을 때만 실행

        // 로그인 한 유저 받아야 함. 1은 임시값
//        if(user.getUserSeq()!=user_id) return ApiResponse.fail();
        if(Long.valueOf(1)!=user_seq) return ApiResponse.fail();
        String result=service.updateComment(comment_id,user_seq,dto);
        return ApiResponse.success("success",result);
    }
}
