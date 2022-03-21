package com.soboksobok.soboksobok.domain.dto;

import com.soboksobok.soboksobok.domain.Comment;
import com.soboksobok.soboksobok.domain.Qna;
import com.soboksobok.soboksobok.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Schema(description = "댓글 Request")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentReqDto {
    @Schema(description = "댓글 아이디")
    private Long comment_id;

    @Schema(description = "댓글 내용")
    @NotBlank(message = "댓글은 Null이거나 공백일 수 없습니다")
    private String comment_content;

    @Schema(description = "작성일")
    private LocalDateTime comment_created_at;

    @Schema(description = "수정일")
    private LocalDateTime comment_updated_at;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY, readOnly = true, required = false, description = "댓글이 달린 QNA", nullable = true)
    private Qna qna;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY, readOnly = true, required = false, description = "작성자", nullable = true)
    private User user;

    // Dto->Entity
    public Comment of(){
        Comment comments= Comment.builder()
                .comment_content(comment_content)
                .comment_created_at(comment_created_at)
                .comment_updated_at(comment_updated_at)
                .user(user)
                .qna(qna)
                .build();
        return comments;
    }

}
