package service;

import entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import repository.user.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}