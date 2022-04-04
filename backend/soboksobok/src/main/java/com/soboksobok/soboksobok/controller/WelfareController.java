package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.domain.Keyword;
import com.soboksobok.soboksobok.domain.user.Usedwelfare;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.domain.welfare.Welfarepurpose;
import com.soboksobok.soboksobok.service.KeywordService;
import com.soboksobok.soboksobok.service.UserService;
import com.soboksobok.soboksobok.service.WelfareService;
import com.soboksobok.soboksobok.common.ApiResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
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

    private final UserService userService;
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
    public ApiResponse getwelfarelike(@PathVariable("welfare_id") Long welfare_id) {
        List<Welfare> list = welfareService.getSimilarWelfare(welfare_id);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "사용자 추천 복지 리스트")
    @GetMapping("/recommend")
    public ApiResponse getwelfaregroup() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "사업목적 갯수 출력")
    @GetMapping("/recommend/purpose")
    public Map getwelfarepurpose() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);

        HashMap<String, Long> purposes = new HashMap<>();
        purposes.put("일자리", 0L);
        purposes.put("주거", 0L);
        purposes.put("일상생활", 0L);
        purposes.put("신체건강 및 보건의료", 0L);
        purposes.put("정신건강 및 심리정서", 0L);
        purposes.put("보호 및 돌봄/요양", 0L);
        purposes.put("보육 및 교육", 0L);
        purposes.put("문화 및 여가", 0L);
        purposes.put("안전 및 권익보장", 0L);

        for (int i = 0; i < list.size(); i ++) {
            List<Welfarepurpose> welfarepurposes = list.get(i).getWelfarepurpose();
            for (int j = 0; j < welfarepurposes.size(); j++) {
                String purposename = welfarepurposes.get(j).getPurpose().getPurpose_name();
                purposes.put(purposename, purposes.get(purposename)+1L);
            }
        }

        return purposes;
    }

//    @ApiOperation(value = "그룹 내에서 가장 많이 사용되는 복지 n개")
    @GetMapping("/recommend/grouppopular")
    public Map getwelfaregrouppopular() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);

        HashMap<String, Long> popularused = new HashMap<>();

        for (int i = 0; i < list.size(); i ++) {
            String name = list.get(i).getWelfare_service_name();
            List<Usedwelfare> userlist = list.get(i).getUsingusers();
            if (popularused.get(name) == null) {
                popularused.put(name, (long) userlist.size());
            } else {
                popularused.put(name, popularused.get(name) + userlist.size());
            }
        }

        return popularused;
        // 해당 그룹에서 많이 사용하는 복지들 리스트 n개
    }

    //    @ApiOperation(value = "인기순 복지 리스트")
    @GetMapping("/popular")
    public ApiResponse getwelfarepopular() {
        List<Welfare> list = welfareService.getPopularWelfare();
        return ApiResponse.success("welfare", list);
    }

    //////////////////////////
    @ApiOperation(value = "최신순 복지 리스트")
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

//    @ApiOperation(value = "검색어 키워드 출력")
    @GetMapping("/keyword")
    public ApiResponse loadkeyword() {
        List<Keyword> list = keywordService.getPopularKeyword();
        return ApiResponse.success("keywords", list);
    }
}
