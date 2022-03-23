package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.Target;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {
    Target findByTargetId(Long targetId);
}
