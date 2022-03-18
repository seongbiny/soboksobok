package com.soboksobok.soboksobok.api.service;

import com.soboksobok.soboksobok.api.entity.welfare.Welfare;
import com.soboksobok.soboksobok.api.repository.welfare.WelfareReposisory;
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
