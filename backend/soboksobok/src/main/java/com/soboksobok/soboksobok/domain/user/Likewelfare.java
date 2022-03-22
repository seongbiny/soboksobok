package com.soboksobok.soboksobok.domain.user;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "LIKEWELFARE")
public class Likewelfare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQ")
    private User userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "welfareId")
    private Welfare welfareId;


}
