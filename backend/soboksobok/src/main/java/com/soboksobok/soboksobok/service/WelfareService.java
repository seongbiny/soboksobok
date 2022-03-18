package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.repository.welfare.WelfareReposisory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WelfareService {
    private final WelfareReposisory welfareReposisory;

    public Welfare getWelfare(Long welfare_id) {
        return welfareReposisory.findByWelfareId(welfare_id);
    }

}
