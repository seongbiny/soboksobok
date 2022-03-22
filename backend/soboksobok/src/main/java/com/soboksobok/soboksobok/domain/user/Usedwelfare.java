package com.soboksobok.soboksobok.domain.user;

import com.soboksobok.soboksobok.domain.welfare.Welfare;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Table(name = "USED")
public class Usedwelfare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQ")
    private User userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "welfareId")
    private Welfare welfareId;

//    public Usedwelfare(User userId,Welfare welfareId){
//        this.userSeq = userId;
//        this.welfareId = welfareId;
//    }

    @Override
    public String toString() {
        return "Usedwelfare{" +
                "id=" + id +
                ", userSeq=" + userSeq.getUserSeq() +
                ", welfareId=" + welfareId.getWelfareId() +
                '}';
    }
}
