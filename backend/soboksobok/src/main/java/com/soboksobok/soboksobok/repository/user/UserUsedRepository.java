package com.soboksobok.soboksobok.repository.user;

import com.soboksobok.soboksobok.domain.user.Usedwelfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserUsedRepository extends JpaRepository<Usedwelfare, Long> {
    Usedwelfare findByUserId(String userId);
}
