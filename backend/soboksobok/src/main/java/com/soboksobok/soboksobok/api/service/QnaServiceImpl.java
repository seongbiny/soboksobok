package com.soboksobok.soboksobok.api.service;

import com.soboksobok.soboksobok.api.entity.Qna;
import com.soboksobok.soboksobok.api.entity.dto.QnaDto;
import com.soboksobok.soboksobok.api.entity.dto.UserDto;
import com.soboksobok.soboksobok.api.entity.user.User;
import com.soboksobok.soboksobok.api.repository.user.QnaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QnaServiceImpl implements QnaService{
    @Autowired
    QnaRepository repo;

    @Override
    public List<QnaDto> getAllQna() {
        List<Qna> all = repo.findAll();
        List<QnaDto> qnaDtos = new ArrayList<>();
        QnaDto dto;
        // entity -> dto 변환
        for (int i=0; i<all.size(); i++){
            dto=new QnaDto();
            Qna entity=all.get(i);
            dto.setId(entity.getQna_id());
            dto.setUser(UserDto.of(entity.getUser()));
            dto.setTitle(entity.getQna_title());
            dto.setContent(entity.getQna_content());
            dto.setQna_created_at(entity.getQna_created_at());
            dto.setQna_updated_at(entity.getQna_updated_at());
            qnaDtos.add(dto);
        }
        return qnaDtos;
    }

    @Override
    public List<QnaDto> getMyQna(Long userId) {
        List<Qna> all = repo.findAllByUserId(userId);
        List<QnaDto> qnaDtos = new ArrayList<>();
        QnaDto dto;
        // entity -> dto 변환
        for (int i=0; i<all.size(); i++){
            dto=new QnaDto();
            Qna entity=all.get(i);
            dto.setId(entity.getQna_id());
            dto.setUser(UserDto.of(entity.getUser()));
            dto.setTitle(entity.getQna_title());
            dto.setContent(entity.getQna_content());
            dto.setQna_created_at(entity.getQna_created_at());
            dto.setQna_updated_at(entity.getQna_updated_at());
            qnaDtos.add(dto);
        }
        return qnaDtos;
    }

    @Override
    public QnaDto getQnaDetail(Long qna_id) {
        Optional<Qna> q=repo.findById(qna_id);
        // entity -> dto 변환
        QnaDto dto=new QnaDto();
        dto.setId(q.get().getQna_id());
        dto.setUser(UserDto.of(q.get().getUser()));
        dto.setTitle(q.get().getQna_title());
        dto.setContent(q.get().getQna_content());
        dto.setQna_created_at(q.get().getQna_created_at());
        dto.setQna_updated_at(q.get().getQna_updated_at());

        return dto;
    }

    @Override
    public QnaDto getMyQnaDetail(Long qna_id, Long userId) {
        Optional<Qna> q=repo.findByQnaIdAndUserId(qna_id,userId);
        // entity -> dto 변환
        QnaDto dto=new QnaDto();
        dto.setId(q.get().getQna_id());
        dto.setUser(UserDto.of(q.get().getUser()));
        dto.setTitle(q.get().getQna_title());
        dto.setContent(q.get().getQna_content());
        dto.setQna_created_at(q.get().getQna_created_at());
        dto.setQna_updated_at(q.get().getQna_updated_at());

        return dto;
    }
}
