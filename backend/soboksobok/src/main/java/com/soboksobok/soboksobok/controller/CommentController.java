package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.common.ApiResponse;
import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.domain.dto.CommentResDto;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.service.CommentService;
import com.soboksobok.soboksobok.service.UserService;
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

    @Autowired
    UserService userService;

    @PostMapping("/{qna_id}")
    @ApiOperation(value="댓글 작성",notes="댓글을 작성합니다.")
    public ApiResponse createComment(@PathVariable("qna_id") Long qna_id,@RequestBody CommentReqDto comment) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}",user.getUsername());
        Long userId=user.getUserSeq();
        CommentResDto dto=service.createComment(userId,qna_id,comment);
        return ApiResponse.success("success",dto);
    }

    @DeleteMapping("/{comment_id}")
    @ApiOperation(value="댓글 삭제",notes="댓글을 삭제합니다.")
    public ApiResponse deleteComment(@PathVariable("comment_id") Long comment_id) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}",user.getUsername());
        Long userId=user.getUserSeq();
        String result=service.deleteComment(comment_id,userId);
        return ApiResponse.success("success",result);
    }

    @PatchMapping("/{comment_id}")
    @ApiOperation(value="댓글 수정",notes="댓글을 수정합니다. 'comment_created_at'는 원래 값으로 넣어주세요.'")
    public ApiResponse updateComment(@PathVariable("comment_id") Long comment_id,@RequestBody CommentReqDto dto) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}",user.getUsername());
        Long userId=user.getUserSeq();
        CommentResDto res=service.updateComment(comment_id,userId,dto);
        return ApiResponse.success("success",res);
    }
}
