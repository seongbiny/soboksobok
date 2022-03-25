package com.soboksobok.soboksobok.domain.welfare;

import com.soboksobok.soboksobok.domain.Purpose;

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
    @JoinColumn(name = "PURPOSE_ID")
    private Purpose purpose;

}
