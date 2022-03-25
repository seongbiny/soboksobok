package com.soboksobok.soboksobok.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class CharacterDto {
    private Long child;
    private Long region;
    private List<Long> job;
    private List<Long> family;
}
