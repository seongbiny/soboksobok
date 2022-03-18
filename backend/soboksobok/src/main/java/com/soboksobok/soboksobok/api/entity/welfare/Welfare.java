package com.soboksobok.soboksobok.api.entity.welfare;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "welfare")
public class Welfare {

    @Id
    @Column(name = "welfareId")
    private Long welfareId;

    private String welfare_service_name;
    private String welfare_dept_name;
    private String welfare_target_detail;
    private String welfare_crit;
    private String welfare_service_content;
    private String welfare_howto;
    private String welfare_contact;
    private String welfare_phone;
    private String welfare_site_name;
    private String welfare_site_link;

    @Column(length = 2)
    @NotNull
    private String welfare_area;

    @Column(length = 2)
    @NotNull
    private String welfare_gu;

    @Column(columnDefinition = "TINYINT", length = 2)
    private Long welfare_child;

    @OneToMany(mappedBy = "target")
    private List<Welfaretarget> welfaretarget = new ArrayList<>();

    @OneToMany(mappedBy = "family")
    private List<Welfarefamily> welfarefamily = new ArrayList<>();

    @OneToMany(mappedBy = "purpose")
    private List<Welfarepurpose> welfarepurpose = new ArrayList<>();

    @OneToMany(mappedBy = "life")
    private List<Welfarelife> welfarelife = new ArrayList<>();


}
