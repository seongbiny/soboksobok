package com.soboksobok.soboksobok.controller;


import com.soboksobok.soboksobok.common.ApiResponse;
import com.soboksobok.soboksobok.domain.user.Likewelfare;
import com.soboksobok.soboksobok.domain.user.Usedwelfare;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.service.UserService;
import com.soboksobok.soboksobok.service.WelfareService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final WelfareService welfareService;

    @GetMapping()
    public ApiResponse getUser() {
        System.out.println("getUser");
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }

    @GetMapping("/profile")
    public ApiResponse getUserInfo() {
        System.out.println("테스트트");
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }

//    @PostMapping("/update")
//    public ApiResponse updateUser(@RequestBody User user){
//        System.out.println("updateUser");
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User update = userService.getUser(principal.getUsername());
//        return ApiResponse.success("update",update);
//    }

    @GetMapping("/used")
    public ApiResponse getUsedWelfare(){
        System.out.println("사용중 복지 불러오기");
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        List<Usedwelfare> used = userService.getAllUsedList();
        List<Welfare> res = new ArrayList<>();
        for(Usedwelfare i: used){
            if(i.getUser().getUserSeq()==user.getUserSeq()){
                res.add(welfareService.getWelfare(i.getWelfare().getWelfareId()));
            }
        }
        return ApiResponse.success("usedWelfareList",res);
    }

    @PutMapping("/used/{welfare_id}")
    public ApiResponse saveUsedWelfare(@PathVariable("welfare_id") Long welfare_id){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Usedwelfare used = new Usedwelfare();
        used.setUser(user);
        used.setWelfare(welfareService.getWelfare(welfare_id));
        userService.setUserUsedRepository(used);

        return ApiResponse.success("save","success");
    }

    @GetMapping("/like")
    public ApiResponse getLikeWelfare(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        List<Likewelfare> like = userService.getAllLikeList();
        List<Welfare> res = new ArrayList<>();
        for(Likewelfare i:like){
            if(i.getUser().getUserSeq()==user.getUserSeq()){
                res.add(welfareService.getWelfare(i.getWelfare().getWelfareId()));
            }
        }
        return ApiResponse.success("likeList",res);
    }

    @PutMapping("/like/{welfare_id}")
    public ApiResponse saveLikeWelfare(@PathVariable("welfare_id") Long welfare_id){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Likewelfare like = new Likewelfare();
        like.setUser(user);
        like.setWelfare(welfareService.getWelfare(welfare_id));
        userService.setLikeRepository(like);

        return ApiResponse.success("save","success");
    }


}
