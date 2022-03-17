package com.soboksobok.soboksobok.api.entity;

import com.soboksobok.soboksobok.api.entity.welfare.Welfarefamily;
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
public class Family {

    @Id
    @GeneratedValue
    private Long family_id;
    private String family_name;

    @OneToMany
    private List<Welfarefamily> wefarefamily = new ArrayList<>();

}
