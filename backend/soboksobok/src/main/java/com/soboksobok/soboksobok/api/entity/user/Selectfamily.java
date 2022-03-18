package com.soboksobok.soboksobok.api.entity.user;

import com.soboksobok.soboksobok.api.entity.Family;

import javax.persistence.*;

@Entity
public class Selectfamily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "FAMILY_ID")
    private Family family;
}
