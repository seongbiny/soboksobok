package com.soboksobok.soboksobok.controller;

import com.soboksobok.soboksobok.domain.Keyword;
import com.soboksobok.soboksobok.domain.user.Usedwelfare;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.service.KeywordService;
import com.soboksobok.soboksobok.service.UserService;
import com.soboksobok.soboksobok.service.WelfareService;
import com.soboksobok.soboksobok.common.ApiResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.models.links.Link;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.swing.*;
import java.lang.reflect.Array;
import java.util.*;

import static java.lang.Long.reverse;
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
    public List getwelfarelike(@PathVariable("welfare_id") Long welfare_id) {
        List list = welfareService.getSimilarWelfare(welfare_id);
        return list;
    }

//    @ApiOperation(value = "사용자 추천 복지 리스트")
    @GetMapping("/recommend")
    public ApiResponse getwelfaregroup() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        if (user == null) {
            return ApiResponse.fail();
        }
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);
        return ApiResponse.success("welfare", list);
    }

//    @ApiOperation(value = "사업목적 갯수 출력")
    @GetMapping("/recommend/purpose")
    public Map getwelfarepurpose() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        if (user == null) {
            return null;
        }
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);

        LinkedHashMap<String, Long> purposes = new LinkedHashMap<>();

        for (int i = 0; i < list.size(); i ++) {
            String purposename = list.get(i).getWelfare_service_type();
            if (purposename != null) {
//                if (purposename.contains("\\/")) {
//                    System.out.println(purposename);
//                    System.out.println("\\/가 있음!");
//                    purposename.replace("\\/", "/");
//                }
                if (purposename.contains("||")) {
                    String[] purposelist = purposename.split("\\|\\|");
                    for (int j = 0; j < purposelist.length; j++) {
                        String nowpurposename = purposelist[j];
                        if (nowpurposename.contains("(")) {
                            String [] spl = nowpurposename.split("\\(");
                            nowpurposename = spl[0];
                        }
                        if (purposes.get(nowpurposename) == null) {
                            purposes.put(nowpurposename, 1L);
                        } else {
                            purposes.put(nowpurposename, purposes.get(nowpurposename) + 1L);
                        }
                    }
                } else
                {
                    if (purposename.contains("(")) {
                        String [] spl = purposename.split("\\(");
                        purposename = spl[0];
                    }
                    if (purposes.get(purposename) == null) {
                        purposes.put(purposename, 1L);
                    } else {
                        purposes.put(purposename, purposes.get(purposename) + 1L);
                    }
                }
            }
        }
        System.out.println(purposes);
        return purposes;
//        if (purposes.size() <= 6) {
//            return purposes;
//        } else {
//            LinkedHashMap<String, Long> result = sortMapByValue(purposes);
//
//            return (Map) result.entrySet().stream().limit(6);
//        }
//
//        HashMap<String, Long> purposes = new HashMap<>();
//
//        purposes.put("서비스", 53L);
//        purposes.put("현금", 25L);
//        purposes.put("현물", 13L);
//        purposes.put("의료지원", 11L);
//        purposes.put("기타", 8L);
//        purposes.put("문화/여가지원", 5L);

//        return purposes;
    }

//    @ApiOperation(value = "그룹 내에서 가장 많이 검색된 복지 n개")
    @GetMapping("/recommend/grouppopular")
    public List getwelfaregrouppopular() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        if (user == null) {
            return null;
        }
        Long group = user.getUserGroup();

        List popularview = new ArrayList<Object>();

        List<Welfare> list = welfareService.getPopularInGroup(group);

        for (int i = 0; i < 6; i ++) {
            Map<String, Object> newmap = new HashMap<String, Object>();
            newmap.put("welfare_id", list.get(i).getWelfareId());
            newmap.put("welfare_service_name", list.get(i).getWelfare_service_name());
            newmap.put("welfare_view", list.get(i).getWelfare_view());
            newmap.put("welfare_service_content", list.get(i).getWelfare_service_content());

            popularview.add(newmap);
        }

        return popularview;
//        Map<String, Object> map1 = new HashMap<String, Object>();
//        Map<String, Object> map2 = new HashMap<String, Object>();
//        Map<String, Object> map3 = new HashMap<String, Object>();
//        Map<String, Object> map4 = new HashMap<String, Object>();
//        Map<String, Object> map5 = new HashMap<String, Object>();
//
//        map1.put("welfare_id", 3514);
//        map1.put("welfare_service_name", "저소득장애인 장애심사용 진단서 발급비 및 검사비 지원");
//        map1.put("welfare_view", 5879);
//        map2.put("welfare_id", 3516);
//        map2.put("welfare_service_name", "보험급여 (건강보험 장애인보조기기)");
//        map2.put("welfare_view", 31141);
//        map3.put("welfare_id", 3496);
//        map3.put("welfare_service_name", "농기계 임대 서비스");
//        map3.put("welfare_view", 6122);
//        map4.put("welfare_id", 960);
//        map4.put("welfare_service_name", "저소득층 이사비용 지원");
//        map4.put("welfare_view", 89);
//        map5.put("welfare_id", 1722);
//        map5.put("welfare_service_name", "국가 예방접종 지원");
//        map5.put("welfare_view", 293);
//
//        popularused.add(map1);
//        popularused.add(map2);
//        popularused.add(map3);
//        popularused.add(map4);
//        popularused.add(map5);
//
//        return popularused;
        // 해당 그룹에서 많이 사용하는 복지들 리스트 n개
    }

    //    @ApiOperation(value = "인기순 복지 리스트")
    @GetMapping("/popular")
    public ApiResponse getwelfarepopular() {
        List<Welfare> list = welfareService.getPopularWelfare();
        return ApiResponse.success("welfare", list);
    }

    //////////////////////////
//    @ApiOperation(value = "최신순 복지 리스트")
//    @GetMapping("/recent")
//    public ApiResponse getwelfarerecent() {
//        String keyword = "청년";
//        List<Welfare> list = welfareService.getWelfarebykeyword(keyword);
//        return ApiResponse.success("welfare", list);
//    }

//    @ApiOperation(value = "복지데이터 검색")
    @GetMapping("/search/{keyword}")
    public List welfaresearch(@PathVariable("keyword") String keyword) {
//        keywordService.getOrsetKeywordbyname(keyword);
        List list = welfareService.getWelfarebykeyword(keyword);
        if (list.size() != 0) {
            keywordService.getOrsetKeywordbyname(keyword);
        }
        return list;
    }

//    @ApiOperation(value = "검색어 키워드 출력")
    @GetMapping("/keyword")
    public ApiResponse loadkeyword() {
        List<Keyword> list = keywordService.getPopularKeyword();
        return ApiResponse.success("keywords", list);
    }

    public static LinkedHashMap<String, Long> sortMapByValue(Map<String, Long> map) {
        List<Map.Entry<String, Long>> entries = new LinkedList<>(map.entrySet());
        Collections.sort(entries, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));

        LinkedHashMap<String, Long> result = new LinkedHashMap<>();
        for (Map.Entry<String, Long> entry : entries) {
            result.put(entry.getKey(), entry.getValue());
        }
        return result;
    }
}
