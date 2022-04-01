//package com.soboksobok.soboksobok.domain.welfare;
//
//import javax.persistence.*;
//import java.lang.reflect.Array;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Entity
//public class Similarwelfare {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "WELFARE_ID")
//    private Welfare welfare;
//
//    @ManyToOne
//    @JoinColumn(name = "SIMILAR_WELFARE")
//    private Welfare similar_welfare;
//
//    @Column
//    private float howsimilar;
//}
