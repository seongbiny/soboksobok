package com.soboksobok.soboksobok.repository.user;

import com.soboksobok.soboksobok.domain.user.Usedwelfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsedwelfareRepository extends JpaRepository<Usedwelfare, Long> {
    List<Usedwelfare> findAllByUserSeq_UserSeq(Long userSeq);
}
