package com.soboksobok.soboksobok.domain;

import com.soboksobok.soboksobok.domain.welfare.Welfarelife;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "life")
public class Life {

    @Id
    @GeneratedValue
    private Long age_id;

    @Column(length = 50)
    private String age_name;

    @OneToMany
    private List<Welfarelife> welfarelife = new ArrayList<>();
}
