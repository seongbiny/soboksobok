package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.dto.QnaDto;
import com.soboksobok.soboksobok.domain.dto.WriteQnaDto;
import com.soboksobok.soboksobok.domain.user.User;

import java.util.List;

public interface QnaService {
    List<QnaDto> getAllQna();
    List<QnaDto> getMyQna(Long userId);
    QnaDto getQnaDetail(Long qna_id);
    QnaDto getMyQnaDetail(Long qna_id,Long userId);
    QnaDto createMyQna(QnaDto qnaDto, User user);
}
