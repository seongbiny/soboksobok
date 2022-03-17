package com.soboksobok.soboksobok.api.entity;

import com.soboksobok.soboksobok.api.entity.welfare.Welfarepurpose;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Purpose {

    @Id
    @GeneratedValue
    private Long purpose_id;
    private String purpose_name;

    @OneToMany
    private List<Welfarepurpose> wefarepurpose = new ArrayList<>();
}
