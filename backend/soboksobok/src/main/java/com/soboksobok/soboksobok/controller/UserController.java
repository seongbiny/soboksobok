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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        List<Usedwelfare> used = userService.getUsed(user);
        List<Welfare> res = new ArrayList<>();
        for(Usedwelfare i: used){
            //res.add(welfareService.getWelfare(i))
            System.out.println(i.toString());
        }
        return ApiResponse.success("usedList",used);
    }

    @GetMapping("/like")
    public ApiResponse getLikeWelfare(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        List<Likewelfare> like = userService.getLike(user);

        return ApiResponse.success("likeList",like);
    }

}
