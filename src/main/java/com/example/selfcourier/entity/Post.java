package com.example.selfcourier.entity;

import com.example.selfcourier.model.post.enums.Category;
import com.example.selfcourier.model.post.enums.PostStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "delivery_post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    private String postID;

    private String title;
    private String description;

    private double weight;
    private double price;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;


    @ManyToOne
    @JoinColumn(name = "userId")
//    @Column("")
    private Users userId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "pickup_location_id")
    private Location pickupLocation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "drop_location_id")
    private Location dropLocation;

    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<UploadedImage> images;


    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL)
    private BillEstimate billEstimate;
    
}
