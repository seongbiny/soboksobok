package com.soboksobok.soboksobok.domain.welfare;
import com.soboksobok.soboksobok.domain.Life;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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
