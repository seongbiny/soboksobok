package com.soboksobok.soboksobok.api.controller.welfare;

import com.soboksobok.soboksobok.api.entity.welfare.Welfare;
import com.soboksobok.soboksobok.api.service.WelfareService;
import com.soboksobok.soboksobok.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/welfare")
@RequiredArgsConstructor
public class WelfareController {

    private final WelfareService welfareService;

//    @ApiOperation(value = "단일복지 상세데이터")
    @GetMapping("/{welfare_id}")
    public ApiResponse getwelfare(@PathVariable("welfare_id") Long welfare_id) {
        Welfare welfare = welfareService.getWelfare(welfare_id);
        return ApiResponse.success("welfare", welfare);
    }
//    @ApiOperation(value = "단일복지 유사복지 리스트")
    @GetMapping("/{welfare_id}/recommend")
    public ApiResponse getwelfarelike() {
        String result = "ok";
        return ApiResponse.success("welfare", result);
    }
//    @ApiOperation(value = "사용자 추천 복지 리스트")
    @GetMapping("/recommend/{user_id}")
    public ApiResponse getwelfaregroup() {
        String result = "ok";
        return ApiResponse.success("welfare", result);
    }
//    @ApiOperation(value = "인기순 복지 리스트")
    @GetMapping("/popular")
    public ApiResponse getwelfarepopular() {
        String result = "ok";
        return ApiResponse.success("welfare", result);
    }

//    @ApiOperation(value = "최신순 복지 리스트")
    @GetMapping("/recent")
    public ApiResponse getwelfarerecent() {
        String result = "ok";
        return ApiResponse.success("welfare", result);
    }

//    @ApiOperation(value = "복지데이터 검색")
    @GetMapping("/search/{String}")
    public ApiResponse getwelfareauto() {
        String result = "ok";
        return ApiResponse.success("welfare", result);
    }
}
