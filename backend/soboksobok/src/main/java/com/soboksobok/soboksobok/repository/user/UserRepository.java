package com.soboksobok.soboksobok.repository.user;

import com.soboksobok.soboksobok.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
    Optional<User> findById(Long userSeq);
}
