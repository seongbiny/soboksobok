package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WelfareReposisory extends JpaRepository<Welfare, Long> {
    Welfare findByWelfareId(Long welfare_id);
}
