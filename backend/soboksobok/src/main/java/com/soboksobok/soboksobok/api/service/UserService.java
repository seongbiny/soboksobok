package com.soboksobok.soboksobok.api.service;

import com.soboksobok.soboksobok.api.entity.user.User;
import com.soboksobok.soboksobok.api.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
