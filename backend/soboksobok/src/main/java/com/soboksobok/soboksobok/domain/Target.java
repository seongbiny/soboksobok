package com.soboksobok.soboksobok.domain;

import com.soboksobok.soboksobok.domain.welfare.Welfaretarget;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "target")
public class Target {

    @Id
    @GeneratedValue
    private Long targetId;

    @Column(length = 50)
    private String targetName;

    @OneToMany
    private List<Welfaretarget> welfaretarget = new ArrayList<>();

}
