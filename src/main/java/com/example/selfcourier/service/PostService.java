package com.example.selfcourier.service;

import com.example.selfcourier.model.post.CreatePostRequest;
import com.example.selfcourier.model.post.PostResponse;
import com.example.selfcourier.model.post.PostUpdateRequest;

import java.util.List;

public interface PostService {
    PostResponse createPost(CreatePostRequest createPostRequest, String userEmail);

    List<PostResponse> getAllPosts();

    PostResponse updatePost(String id, PostUpdateRequest postUpdateRequest);

    void deletePost(String id);
}
