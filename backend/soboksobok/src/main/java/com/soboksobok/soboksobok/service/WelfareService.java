package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import com.soboksobok.soboksobok.repository.welfare.WelfareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WelfareService {

    @Autowired
    private final WelfareRepository welfareRepository;

    public Welfare getWelfare(Long welfare_id) {
        return welfareRepository.findByWelfareId(welfare_id);
    }

    public List<Welfare> getWelfarebykeyword(String keyword) {
        return welfareRepository.searchWelfare(keyword);
    }
}
