package com.soboksobok.soboksobok.api.entity;

import com.soboksobok.soboksobok.api.entity.dto.QnaDto;
import com.soboksobok.soboksobok.api.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Qna")
public class Qna {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //auto increment
    private Long qna_id;

    @ManyToOne(fetch = FetchType.LAZY) //게시글 쓴 사람
    @JoinColumn(name="qna_user_id") //매핑할 키 값, user pk와 매핑됨
    private User user;

    @Column(length = 50)
    private String qna_title;

    private String qna_content;

    @Builder.Default
    private LocalDateTime qna_created_at=LocalDateTime.now();

    @Builder.Default
    private LocalDateTime qna_updated_at=LocalDateTime.now();

//    public static Qna of(User user, QnaDto qnaDto){
//        return Qna.builder()
//                .qna_title(qnaDto.getTitle())
//                .qna_content(qnaDto.getContent())
//                .qna_created_at(LocalDateTime.now())
//                .qna_updated_at(LocalDateTime.now())
//                .user(user)
//                .build();
//    }
}
