package com.soboksobok.soboksobok.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter @Setter
@Entity
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keywordId;

    private String keywordName;

    private Long keywordCnt;

    public Long setCntOfKeyword(Long CntOfKeyword) {
        this.keywordCnt = CntOfKeyword;
        return this.keywordCnt;
    }
}
