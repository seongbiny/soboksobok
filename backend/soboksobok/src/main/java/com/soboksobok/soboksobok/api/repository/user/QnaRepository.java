package com.soboksobok.soboksobok.api.repository.user;

import com.soboksobok.soboksobok.api.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QnaRepository extends JpaRepository<Qna,Long> {
    List<Qna> findAll();
    Optional<Qna> findById(Long qna_id);
}
