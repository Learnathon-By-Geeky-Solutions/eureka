package com.example.selfcourier.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "upload_image")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UploadedImage {

    @Id
    private String id;

    private String url;
    private String fileId;
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "postID")
    private Post post;
}
