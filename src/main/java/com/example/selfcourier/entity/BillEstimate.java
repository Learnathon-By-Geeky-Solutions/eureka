package com.example.selfcourier.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bill")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillEstimate {

    @Id
    private String id;

    private Double basePrice;
    private Double price;
    private  Double weight;
    private Double extraWeight;
    private Double extraCharge;

    @OneToOne
    @JoinColumn(name = "postID")
    private Post post;
}
