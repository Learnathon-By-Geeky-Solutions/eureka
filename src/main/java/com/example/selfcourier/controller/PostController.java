package com.example.selfcourier.controller;


import com.example.selfcourier.config.JwtService;
import com.example.selfcourier.model.post.CreatePostRequest;
import com.example.selfcourier.model.post.PostResponse;
import com.example.selfcourier.model.post.PostUpdateRequest;
import com.example.selfcourier.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/posts")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class PostController {
    private final JwtService jwtService;
    private final PostService postService;


    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody CreatePostRequest request, HttpServletRequest httpServletRequest) {
//        log.info("Received create post request: {}", request);
        System.out.println(" -----> post request : "+ request);
        try {
            String email = ExtractEmail(httpServletRequest);
            PostResponse postResponse = postService.createPost(request, email);
            System.out.println("-----> email for user, "+ email + " -----> post response : "+ postResponse);
            return ResponseEntity.ok(postResponse);
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        catch (Exception e) {
//            e.printStackTrace();
            System.out.println(" -----> post create errors : "+ e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    private String ExtractEmail(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing or invalid authentication");
        }

        String token = authHeader.substring(7);


        try {
            return jwtService.extractUserName(token);

        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid or expire token");
        }
    }


    @GetMapping
    public List<PostResponse> getAllPosts(){
        return postService.getAllPosts();
    }
    @PutMapping("/{postID}")
    public PostResponse updatePost(@PathVariable  String postID, @RequestBody PostUpdateRequest request){
        return postService.updatePost(postID, request);
    }

    @DeleteMapping("/{postID}")
    public void deletePost(@PathVariable String postID){
        postService.deletePost(postID);
    }
}
