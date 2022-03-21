package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.Comment;
import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService{
//    @Autowired
//    CommentRepository repo;
//
//    @Override
//    public List<CommentReqDto> getAllComment(Long qnaId) {
//        System.out.println("service");
//        List<Comment> all = repo.findAllByQnaId(qnaId);
//        log.info("all {}",all);
//        List<CommentReqDto> commentDtos = new ArrayList<>();
//        CommentReqDto dto;
//        // entity -> dto 변환
//        for (int i=0; i<all.size(); i++){
//            dto=new CommentReqDto();
//            Comment entity=all.get(i);
//            dto.setComment_id(entity.getComment_id());
//            dto.setComment_content(entity.getComment_content());
//            dto.setComment_created_at(entity.getComment_created_at());
//            dto.setComment_updated_at(entity.getComment_updated_at());
//            dto.setQna(entity.getQna());
//            commentDtos.add(dto);
//        }
//        return commentDtos;
//    }
}
