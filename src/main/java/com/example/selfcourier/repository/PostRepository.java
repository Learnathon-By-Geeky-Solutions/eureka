package com.example.selfcourier.repository;

import com.example.selfcourier.entity.Post;
import com.example.selfcourier.model.post.enums.Category;
import com.example.selfcourier.model.post.enums.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    List<Post> findAllByUserId_UserId (Long userId);
    List<Post> findAllByStatus (PostStatus status);
    List<Post> findAllByCategory (Category category);

    @Query("SELECT p FROM Post p WHERE p.category = :category AND p.status = :status")
    List<Post> findByCategoryAndStatus(@Param("category") Category category, @Param("status") PostStatus status);


}
