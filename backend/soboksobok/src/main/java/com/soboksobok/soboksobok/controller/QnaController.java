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
    public ApiResponse getMyQna() throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}"+user.getUsername());
        Long userId=user.getUserSeq();
        List<QnaDto> list=service.getMyQna(userId);
        log.info("qna 개수 확인: {}"+list.size());
        return ApiResponse.success("success",list);
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
    public ApiResponse getMyQnaDetail(@PathVariable("qna_id") Long qna_id) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}"+user.getUsername());
        Long userId=user.getUserSeq();
        QnaDto qna=service.getMyQnaDetail(qna_id,userId);
        List<CommentResDto> comments = qna.getComments(); //댓글
        return ApiResponse.success("success",qna);
    }

    @PostMapping("/mine")
    @ApiOperation(value="qna 등록",notes="qna를 등록합니다.")
    public ApiResponse createMyQna(@RequestBody WriteQnaDto dto) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}"+user.getUsername());
        Long userId=user.getUserSeq();
        QnaDto qnaDto=QnaDto.of(dto);
        QnaDto qna=service.createMyQna(qnaDto,userId);
        return ApiResponse.success("success",qna);
    }

    @DeleteMapping("/mine/{qna_id}")
    @ApiOperation(value="qna 삭제",notes="qna를 삭제합니다.")
    public ApiResponse deleteMyQna(@PathVariable("qna_id") Long qna_id) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}"+user.getUsername());
        Long userId=user.getUserSeq();
        String result=service.deleteMyQna(qna_id,userId);
        return ApiResponse.success("success",result);
    }

    @PatchMapping("/mine/{qna_id}")
    @ApiOperation(value="qna 수정",notes="qna를 수정합니다. content와 title에 수정된 내용을 넣어줍니다. 만약, 수정된 내용이 없다면 원래 내용을 넣어주세요.")
    public  ApiResponse updateMyQna(@PathVariable("qna_id") Long qna_id, @RequestBody WriteQnaDto dto) throws Exception{
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}"+user.getUsername());
        Long userId=user.getUserSeq();
        QnaDto qnaDto=QnaDto.of(dto);
        String result=service.updateMyQna(qna_id,userId,qnaDto);
        return ApiResponse.success("success",result);
    }
}
