package com.soboksobok.soboksobok.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.soboksobok.soboksobok.domain.welfare.Welfarefamily;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "family")
public class Family {

    @Id
    @GeneratedValue
    private Long familyId;

    @Column(length = 50)
    private String familyName;

    @OneToMany
    @JsonManagedReference
    private List<Welfarefamily> welfarefamily = new ArrayList<>();

}
