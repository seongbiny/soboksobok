package com.soboksobok.soboksobok.api.entity.welfare;

import com.soboksobok.soboksobok.api.entity.Family;

import javax.persistence.*;

@Entity
public class Welfarefamily {

    @Id
    @GeneratedValue()
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WELFARE_ID")
    private Welfare welfare;

    @ManyToOne
    @JoinColumn(name = "TARGET_ID")
    private Family family;

}
