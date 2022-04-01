package com.soboksobok.soboksobok.domain;

import com.soboksobok.soboksobok.domain.welfare.Welfarepurpose;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@Table(name = "purpose")
public class Purpose {

    @Id
    @GeneratedValue
    private Long purpose_id;

    @Column(length = 50)
    private String purpose_name;

    @OneToMany
    private List<Welfarepurpose> welfarepurpose = new ArrayList<>();
}
