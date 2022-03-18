package com.soboksobok.soboksobok.controller;


import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.service.UserService;
import com.soboksobok.soboksobok.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

//    @PostMapping("/update")
//    public ApiResponse updateUser(@RequestBody User user){
//        System.out.println("updateUser");
//        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User update = userService.getUser(principal.getUsername());
//        return ApiResponse.success("update",update);
//    }
}
