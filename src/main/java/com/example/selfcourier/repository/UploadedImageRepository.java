package com.example.selfcourier.repository;

import com.example.selfcourier.entity.UploadedImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UploadedImageRepository extends JpaRepository<UploadedImage, String> {
    List<UploadedImage> findByPost_PostID(String postId);
}
