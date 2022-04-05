package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.domain.Keyword;
import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.service.KeywordService;
import com.soboksobok.soboksobok.service.WelfareService;
import com.soboksobok.soboksobok.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Long.valueOf;

@RestController
@CrossOrigin("*")
@RequestMapping("/welfare")
@RequiredArgsConstructor
public class WelfareController {

    private final WelfareService welfareService;
    private final KeywordService keywordService;

//    @ApiOperation(value = "단일복지 상세데이터")
    @GetMapping("/{welfare_id}")
    public ApiResponse getwelfare(@PathVariable("welfare_id") Long welfare_id) {
        Welfare welfare = welfareService.getWelfare(welfare_id);
        return ApiResponse.success("welfare", welfare);
    }
//    @ApiOperation(value = "단일복지 유사복지 리스트")
    @GetMapping("/{welfare_id}/recommend")
    public ApiResponse getwelfarelike() {
        String keyword = "복지";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }
//    @ApiOperation(value = "사용자 추천 복지 리스트")
    @GetMapping("/recommend")
    public ApiResponse getwelfaregroup() {
        String keyword = "취업";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }

    //    @ApiOperation(value = "사업목적 갯수 출력")
    @GetMapping("/recommend/purpose")
    public Map getwelfarepurpose() {
        String keyword = "취업";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);

        HashMap<String, Long> purposes = new HashMap<>();
        purposes.put("일자리", 6L);
        purposes.put("주거", 4L);
        purposes.put("일상생활", 1L);
        purposes.put("신체건강 및 보건의료", 1L);
        purposes.put("정신건강 및 심리정서", 1L);
        purposes.put("보호 및 돌봄/요양", 1L);
        purposes.put("보육 및 교육", 2L);
        purposes.put("문화 및 여가", 8L);
        purposes.put("안전 및 권익보장", 1L);

        Long list_size = valueOf(list.size());
        for (int i=0; i<list_size ; i++) {
            System.out.println(list.get(i));
        }
//        List<Integer> purposes = new ArrayList<>(9);
//        for (int i=0 ; i<9 ; i++) {
//            purposes.add(0);
//        }

//        for (int i=0 ; i<size ; i++) {
//            purposes. = list.get(i).get("year").toArray();
//        }
//        System.out.println(purposes);

        return purposes;
    }

    //    @ApiOperation(value = "인기순 복지 리스트")
    @GetMapping("/popular")
    public ApiResponse getwelfarepopular() {
        String keyword = "노인";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "최신순 복지 리스트")
    @GetMapping("/recent")
    public ApiResponse getwelfarerecent() {
        String keyword = "청년";
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "복지데이터 검색")
    @GetMapping("/search/{keyword}")
    public ApiResponse welfaresearch(@PathVariable("keyword") String keyword) {
        keywordService.getOrsetKeywordbyname(keyword);
        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
        return ApiResponse.success("welfares", list);
    }

    @GetMapping("/keyword")
    public ApiResponse loadkeyword() {
        List<Keyword> list = keywordService.getPopularKeyword();
        return ApiResponse.success("keywords", list);
    }
}
