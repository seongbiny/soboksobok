package com.soboksobok.soboksobok.api.entity.welfare;

import com.soboksobok.soboksobok.api.entity.Purpose;

import javax.persistence.*;

@Entity
public class Welfarepurpose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WELFARE_ID")
    private Welfare welfare;

    @ManyToOne
    @JoinColumn(name = "TARGET_ID")
    private Purpose purpose;

}
