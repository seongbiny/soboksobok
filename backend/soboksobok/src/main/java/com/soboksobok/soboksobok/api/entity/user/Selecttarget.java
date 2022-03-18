package com.soboksobok.soboksobok.api.entity.user;

import com.soboksobok.soboksobok.api.entity.Target;

import javax.persistence.*;

@Entity
public class Selecttarget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "TARGET_ID")
    private Target target;
}
