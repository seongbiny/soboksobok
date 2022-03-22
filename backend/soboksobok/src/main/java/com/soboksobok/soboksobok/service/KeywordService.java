package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.Keyword;
import com.soboksobok.soboksobok.repository.welfare.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    @Autowired
    private final KeywordRepository keywordRepository;

    public List<Keyword> getAllKeyword() {
        return keywordRepository.findAllKeyword();
    }

//    public void plusKeyword(String keyword) {
//        keywordRepository.setKeyword();
//    }
}
