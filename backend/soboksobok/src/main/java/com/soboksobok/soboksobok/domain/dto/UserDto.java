package com.soboksobok.soboksobok.domain.dto;

import com.soboksobok.soboksobok.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

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
