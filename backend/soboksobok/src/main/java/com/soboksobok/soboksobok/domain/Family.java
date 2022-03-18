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
    private Long family_id;

    @Column(length = 50)
    private String family_name;

    @OneToMany
    private List<Welfarefamily> welfarefamily = new ArrayList<>();

}
