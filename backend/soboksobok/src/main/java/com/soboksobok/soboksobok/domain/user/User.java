package com.soboksobok.soboksobok.domain.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.soboksobok.soboksobok.oauth.entity.ProviderType;
import com.soboksobok.soboksobok.oauth.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "USER")
public class User {
    @JsonIgnore
    @Id
    @Column(name = "USER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @OneToMany(mappedBy = "user")
    private List<Usedwelfare> usedwelfares = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Likewelfare> likewelfares = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Selectfamily> selectfamilies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Selecttarget> selecttargets = new ArrayList<>();

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "USERNAME", length = 100)
    @NotNull
    @Size(max = 100)
    private String username;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 128)
    @Size(max = 128)
    private String password;

//    @Column(name = "EMAIL", length = 512, unique = true)
//    @Size(max = 512)
//    private String email;
//
//    @Column(name = "EMAIL_VERIFIED_YN", length = 1)
//    @Size(min = 1, max = 1)
//    private String emailVerifiedYn;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @Column(name = "AGE")
    private String ageRange;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "BIRTH")
    private String birth;

    @Column(name = "CHILD")
    private String child;

    @Column(name = "AREA")
    private String area;

    @Column(name = "GU")
    private String gu;

    public User(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 100) String username,
//            @Size(max = 512) String email,
//            @Size(max = 1) String emailVerifiedYn,
            @Size(max = 512) String profileImageUrl,
            ProviderType providerType,
            RoleType roleType,
            LocalDateTime createdAt,
            LocalDateTime modifiedAt
//            String ageRange,
//            String gender,
//            String birth
    ) {
        this.userId = userId;
        this.username = username;
        this.password = "NO_PASS";
//        this.email = email != null ? email : "NO_EMAIL";
//        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
//        this.ageRange = ageRange;
//        this.gender = gender;
//        this.birth = birth;

    }
}
