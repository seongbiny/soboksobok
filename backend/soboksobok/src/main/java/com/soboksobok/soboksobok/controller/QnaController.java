package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.domain.dto.QnaDto;
import com.soboksobok.soboksobok.service.QnaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/qna")
@Api("Qna Controller")
public class QnaController {
    @Autowired
    QnaService service;

    @GetMapping
    @ApiOperation(value="전체 qna",notes="hihi")
//    @Operation(summary = "전체 qna 조회")
//    @ApiResponses( value = {
//            @ApiResponse(responseCode = "200", description = "전체 qna 조회 성공")
//    })
    public ResponseEntity<List<QnaDto>> getAllQna() throws Exception{
        List<QnaDto> list=service.getAllQna();
        ResponseEntity<List<QnaDto>> res=new ResponseEntity(list, HttpStatus.OK);
        log.info("qna 개수 확인: "+list.size());
        return res;
    }

    @GetMapping("/mine")
//    @Operation(summary = "내가 등록한 qna 전체 조회")
//    @ApiResponses( value = {
//            @ApiResponse(responseCode = "200", description = "내가 등록한 qna 전체 조회 성공")
//    })
    public ResponseEntity<List<QnaDto>> getMyQna(@ParameterObject Long userId) throws Exception{
        List<QnaDto> list=service.getMyQna(userId);
        ResponseEntity<List<QnaDto>> res=new ResponseEntity(list, HttpStatus.OK);
        log.info("userId: "+userId);
        log.info("qna 개수 확인: "+list.size());
        return res;
    }
    @GetMapping("/{qna_id}")
//    @Operation(summary = "qna 상세 조회")
//    @ApiResponses( value = {
//            @ApiResponse(responseCode = "200", description = "qna 상세 조회 성공")
//    })
    public ResponseEntity<QnaDto> getQnaDetail(@PathVariable("qna_id") Long qna_id) throws Exception{
        QnaDto qna=service.getQnaDetail(qna_id);
        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
        return res;
    }

    @GetMapping("/mine/{qna_id}")
//    @Operation(summary = "내가 등록한 qna 상세 조회")
//    @ApiResponses( value = {
//            @ApiResponse(responseCode = "200", description = "내가 등록한 qna 상세 조회 성공")
//    })
    public ResponseEntity<QnaDto> getMyQnaDetail(@PathVariable("qna_id") Long qna_id, @ParameterObject Long userId) throws Exception{
        QnaDto qna=service.getMyQnaDetail(qna_id,userId);
        ResponseEntity<QnaDto> res=new ResponseEntity(qna, HttpStatus.OK);
        log.info("userId: "+userId);
        return res;
    }


    @GetMapping("/test")
    public String test() throws Exception{
        return "hi";
    }

}
