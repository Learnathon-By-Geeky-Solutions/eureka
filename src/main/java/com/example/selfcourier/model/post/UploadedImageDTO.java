package com.example.selfcourier.model.post;

import com.example.selfcourier.entity.Post;
import com.example.selfcourier.entity.UploadedImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadedImageDTO {
    private String id;
    private String url;
    private String fileId;
    private String thumbnail;

    public static UploadedImageDTO from(UploadedImage uploadedImage){
        return UploadedImageDTO.builder()
                .id(uploadedImage.getId())
                .url(uploadedImage.getUrl())
                .fileId(uploadedImage.getFileId())
                .thumbnail(uploadedImage.getThumbnail())
                .build();
    }

    public UploadedImage toEntity(Post post){
        return UploadedImage.builder()
                .id(UUID.randomUUID().toString())
                .url(this.url)
                .fileId(this.fileId)
                .thumbnail(this.thumbnail)
                .post(post)
                .build();
    }
}
