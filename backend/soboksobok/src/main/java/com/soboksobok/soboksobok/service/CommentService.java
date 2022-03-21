package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.domain.user.User;

import java.util.List;

public interface CommentService {
//    List<CommentReqDto> getAllComment(Long qna_id);
    Long createComment(Long userSeq, Long qna_id, CommentReqDto comment);
}
