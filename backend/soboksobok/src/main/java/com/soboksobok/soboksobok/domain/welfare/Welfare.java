package com.soboksobok.soboksobok.domain.welfare;

import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.Text;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "welfare")
public class Welfare {

    @Id @GeneratedValue
    @Column(name = "welfareId")
    private Long welfareId;

    @Column(name = "welfareOriId")
    private String welfareOriId;

    @Column(name = "welfareServiceName")
    private String welfare_service_name;

    @Column(name = "welfareDeptName")
    private String welfare_dept_name;

    @Column(columnDefinition = "TEXT", name = "welfareTargetDetail")
    private String welfare_target_detail;

    @Column(columnDefinition = "TEXT", name = "welfareCrit")
    private String welfare_crit;

    @Column(columnDefinition = "TEXT", name = "welfareServiceContent")
    private String welfare_service_content;

    @Column(columnDefinition = "TEXT", name = "welfareHowto")
    private String welfare_howto;

    @Column(name = "welfareContact")
    private String welfare_contact;

    @Column(name = "welfarePhone")
    private String welfare_phone;

    @Column(name = "welfareSiteName")
    private String welfare_site_name;

    @Column(name = "welfareSiteLink")
    private String welfare_site_link;

    @Column(name = "welfareGroup")
    private Long welfare_group;

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

    @OneToMany(mappedBy = "similar")
    private List<Welfare> similarwelfare = new ArrayList<>();

}
