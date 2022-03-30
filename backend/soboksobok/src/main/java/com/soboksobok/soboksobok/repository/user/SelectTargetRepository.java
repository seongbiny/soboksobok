package com.soboksobok.soboksobok.repository.user;

import com.soboksobok.soboksobok.domain.user.Selecttarget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectTargetRepository extends JpaRepository<Selecttarget, Long> {
    List<Selecttarget> findByUser_UserSeq(Long userSeq);
    void deleteAllByUser_UserSeq(Long userSeq);
}

