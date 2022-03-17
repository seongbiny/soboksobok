package com.soboksobok.soboksobok.api.controller.welfare;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/welfare")
@RequiredArgsConstructor
public class WelfareController {

//    @ApiOperation(value = "단일복지 상세데이터") #스웨거 태그
    @GetMapping("/welfare/{walfare_id}")

//    @ApiOperation(value = "단일복지 유사복지 리스트")
    @GetMapping("/welfare/{welfare_id}/recommend")

//    @ApiOperation(value = "사용자 그룹 추천 복지 리스트")
    @GetMapping("/welfare/recommend/{user_id}")

//    @ApiOperation(value = "인기순 복지 리스트")
    @GetMapping("/welfare/popular")

//    @ApiOperation(value = "최신순 복지 리스트")
    @GetMapping("/welfare/recent")

//    @ApiOperation(value = "검색창 자동완성")
    @GetMapping("/welfare/search/{String}")
}
