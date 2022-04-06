package com.soboksobok.soboksobok.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.soboksobok.soboksobok.domain.welfare.Welfarelife;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "life")
public class Life {

    @Id
    @GeneratedValue
    private Long age_id;

    @Column(length = 50)
    private String age_name;

    @OneToMany
    @JsonManagedReference
    private List<Welfarelife> welfarelife = new ArrayList<>();
}
