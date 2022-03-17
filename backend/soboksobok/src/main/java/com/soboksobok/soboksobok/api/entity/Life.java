package com.soboksobok.soboksobok.api.entity;

import com.soboksobok.soboksobok.api.entity.welfare.Welfarelife;
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
public class Life {

    @Id
    @GeneratedValue
    private Long age_id;
    private String age_name;

    @OneToMany
    private List<Welfarelife> wefarelife = new ArrayList<>();
}
