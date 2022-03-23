package com.soboksobok.soboksobok.service;

import com.soboksobok.soboksobok.domain.Comment;
import com.soboksobok.soboksobok.domain.Qna;
import com.soboksobok.soboksobok.domain.dto.CommentReqDto;
import com.soboksobok.soboksobok.domain.user.User;
import com.soboksobok.soboksobok.repository.CommentRepository;
import com.soboksobok.soboksobok.repository.user.QnaRepository;
import com.soboksobok.soboksobok.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService{
    @Autowired
    CommentRepository repo;
    @Autowired
    UserRepository userrepo;
    @Autowired
    QnaRepository qnarepo;

    @Override
    public Long createComment(Long userSeq, Long qna_id, CommentReqDto dto) {
        Optional<User> user=userrepo.findById(userSeq);
        log.info("user 정보::{}, 아이디::{}",user.get().getUsername(),user.get().getUserSeq());
        Optional<Qna> qna=qnarepo.findById(qna_id);
        log.info("qna 정보::{}, 아이디::{}",qna.get().getQna_title(),qna.get().getQna_id());
        if(!qna.isPresent()) throw new NullPointerException("존재하지 않는 게시글입니다.");
        dto.setUser(user.get());
        dto.setQna(qna.get());
        Comment comment=dto.of();
        repo.save(comment);
        return dto.getComment_id();
    }

    @Override
    public String deleteComment(Long comment_id) {
        Optional<Comment> comment=repo.findById(comment_id);
        if(!comment.isPresent()) throw new NullPointerException("존재하지 않는 댓글입니다.");
        repo.delete(comment.get());
        return "success";
    }

    @Override
    public String updateComment(Long comment_id, Long user_seq, CommentReqDto dto) {
        Optional<Comment> findcomment=repo.findById(comment_id);
        if(!findcomment.isPresent()) throw new NullPointerException("존재하지 않는 댓글입니다.");
        if(findcomment.get().getUser().getUserSeq()!=user_seq) throw new NullPointerException("작성자만 수정할 수 있습니다.");
        Comment comment=Comment.builder()
                .comment_id(comment_id)
                .comment_content(dto.getComment_content())
                .comment_updated_at(LocalDateTime.now())
                .user(findcomment.get().getUser())
                .qna(findcomment.get().getQna())
                .build();
        repo.save(comment);
        return "success";
    }
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
