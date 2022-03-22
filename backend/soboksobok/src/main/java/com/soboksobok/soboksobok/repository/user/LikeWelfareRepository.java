package com.soboksobok.soboksobok.repository.user;

import com.soboksobok.soboksobok.domain.user.Likewelfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeWelfareRepository extends JpaRepository<Likewelfare, Long> {
    List<Likewelfare> findAllByUserSeq_UserSeq(Long userSeq);
}
