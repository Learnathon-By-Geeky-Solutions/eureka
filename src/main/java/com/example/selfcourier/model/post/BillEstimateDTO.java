package com.example.selfcourier.model.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillEstimateDTO {

    private  double basePrice;
    private double price;
    private double weight;
    private double extraWight;
    private double extraCharge;
}
