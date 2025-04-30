package com.example.selfcourier.model.post;

import com.example.selfcourier.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PostResponse {
    private String postID;
    private String status;
    private String category;

    private LocationDTO pickupLocation;
    private LocationDTO dropLocation;

//    private BillDTO bill;

    private String createAt;
    private String title;
    private String description;
//    private String createAt;

    private List<UploadedImageDTO> images;

    public static PostResponse from (Post post){
        return PostResponse.builder()
                .postID(post.getPostID())
                .title(post.getTitle())
                .status(post.getStatus().name())  // .name(): for status a enum value.
                .category(post.getCategory().name())
                .description(post.getDescription())
                .pickupLocation(LocationDTO.from(post.getPickupLocation()))
                .dropLocation(LocationDTO.from(post.getDropLocation()))
                .createAt(post.getCreateAt() != null ? post.getCreateAt().toString() : null)
                .images(post.getImages()!= null ?
                    post.getImages().stream()
                            .map(UploadedImageDTO::from)
                            .collect(Collectors.toList())
                    : new ArrayList<>())
                .build();
    }

}
