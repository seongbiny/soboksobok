package com.soboksobok.soboksobok.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keywordId;

    private String keywordName;

    private Long keywordCnt;

    public void setkeywordName(String name) {
        this.keywordName = name;
    }

    public Long setKeywordCnt(Long CntOfKeyword) {
        this.keywordCnt = CntOfKeyword;
        return this.keywordCnt;
    }
}
