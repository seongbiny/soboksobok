package com.soboksobok.soboksobok.controller;


import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.service.UserService;
import com.soboksobok.soboksobok.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping()
    public ApiResponse getUser() {
        System.out.println("테스트트");
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

    @GetMapping("/test")
    public ApiResponse test(){
        System.out.println("테테테스트트");
        String test = "테스트 메시지";
        return ApiResponse.success("test",test);
    }
}
