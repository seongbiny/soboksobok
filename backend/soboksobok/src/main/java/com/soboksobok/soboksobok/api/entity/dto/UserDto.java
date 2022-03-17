package com.soboksobok.soboksobok.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.soboksobok.soboksobok.api.entity.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Schema(description = "게시글 유저 정보")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    @Schema(description = "유저 id")
    private Long userSeq;

    public static UserDto of(User user) {
        return UserDto.builder()
                .userSeq(user.getUserSeq())
                .build();
    }

}
