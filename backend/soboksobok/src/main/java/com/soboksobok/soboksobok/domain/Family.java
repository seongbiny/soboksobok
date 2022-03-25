package com.soboksobok.soboksobok.domain;

import com.soboksobok.soboksobok.domain.welfare.Welfarefamily;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "family")
public class Family {

    @Id
    @GeneratedValue
    private Long familyId;

    @Column(length = 50)
    private String familyName;

    @OneToMany
    private List<Welfarefamily> welfarefamily = new ArrayList<>();

}
