package com.soboksobok.soboksobok.repository.welfare;

import com.soboksobok.soboksobok.domain.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {
    Family findByFamilyId(Long familyId);
}
