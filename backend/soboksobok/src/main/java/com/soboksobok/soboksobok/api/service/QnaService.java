package com.soboksobok.soboksobok.api.service;

import com.soboksobok.soboksobok.api.entity.dto.QnaDto;
import com.soboksobok.soboksobok.api.entity.user.User;

import java.util.List;

public interface QnaService {
    List<QnaDto> getAllQna();
    List<QnaDto> getMyQna(Long userId);
    QnaDto getQnaDetail(Long qna_id);
    QnaDto getMyQnaDetail(Long qna_id,Long userId);
}
