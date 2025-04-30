package com.example.selfcourier.model.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostUpdateRequest {
    private String title;
    private String description;
    private Double weight;
    private Double price;
    private LocationDTO pickupLocation;
    private LocationDTO dropLocation;
    private String status;
}
