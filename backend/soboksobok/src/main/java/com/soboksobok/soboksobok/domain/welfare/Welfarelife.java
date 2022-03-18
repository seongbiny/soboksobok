package com.soboksobok.soboksobok.domain.welfare;
import com.soboksobok.soboksobok.domain.Life;

import javax.persistence.*;

@Entity
public class Welfarelife {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WELFARE_ID")
    private Welfare welfare;

    @ManyToOne
    @JoinColumn(name = "LIFE_ID")
    private Life life;

}
