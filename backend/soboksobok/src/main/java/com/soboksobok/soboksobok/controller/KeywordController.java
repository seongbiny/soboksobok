package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.common.ApiResponse;
import com.soboksobok.soboksobok.domain.Keyword;
import com.soboksobok.soboksobok.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/keyword")
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping()
    public ApiResponse getkeyword() {
        List<Keyword> keywords = keywordService.getAllKeyword();
        return ApiResponse.success("keywords", keywords);
    }
}
