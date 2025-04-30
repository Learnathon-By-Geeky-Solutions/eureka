package com.example.selfcourier.model.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePostRequest {
//    private String postID;
    //    private Long userID;
    // take from token
    private String title;
    private String description;

    private List<UploadedImageDTO> images;

    private LocationDTO pickupLocation;
    private LocationDTO dropLocation;

    private double weight;
    private double price;
    private String category;
    private String status;



//    private
//    private BillDTO billEstimate; // create bill when delivery done.
}
