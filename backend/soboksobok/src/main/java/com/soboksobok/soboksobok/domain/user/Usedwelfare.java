package com.soboksobok.soboksobok.domain.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.soboksobok.soboksobok.domain.welfare.Welfare;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "USED")
public class Usedwelfare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "USER_SEQ")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "welfareId")
    private Welfare welfare;

//    public Usedwelfare(User userId,Welfare welfareId){
//        this.userSeq = userId;
//        this.welfareId = welfareId;
//    }

    @Override
    public String toString() {
        return "Usedwelfare{" +
                "id=" + id +
                ", userSeq=" + user.getUserSeq() +
                ", welfareId=" + welfare.getWelfareId() +
                '}';
    }
}
