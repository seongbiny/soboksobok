package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.repository.user.UserRepository;
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
