package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.domain.dto.CommentResDto;
import com.soboksobok.soboksobok.domain.user.User;

import java.util.List;

public interface CommentService {
//    List<CommentReqDto> getAllComment(Long qna_id);
    CommentResDto createComment(Long userSeq, Long qna_id, CommentReqDto comment);
    String deleteComment(Long comment_id);
    CommentResDto updateComment(Long comment_id, Long user_seq, CommentReqDto comment);
}
