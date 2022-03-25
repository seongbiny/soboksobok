package com.soboksobok.soboksobok.domain.welfare;

import com.soboksobok.soboksobok.domain.Family;

import javax.persistence.*;

@Entity
public class Welfarefamily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WELFARE_ID")
    private Welfare welfare;

    @ManyToOne
    @JoinColumn(name = "FAMILY_ID")
    private Family family;

}
