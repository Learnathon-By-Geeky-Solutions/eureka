package com.example.selfcourier.service;

import com.example.selfcourier.config.JwtService;
import com.example.selfcourier.entity.*;
import com.example.selfcourier.error.DefaultException;
import com.example.selfcourier.model.post.CreatePostRequest;
import com.example.selfcourier.model.post.PostResponse;
import com.example.selfcourier.model.post.PostUpdateRequest;
import com.example.selfcourier.model.post.enums.Category;
import com.example.selfcourier.model.post.enums.PostStatus;
import com.example.selfcourier.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final JwtService jwtService;
    private final PostRepository postRepository;
    private final AuthRepository authRepository;
    private final LocationRepository locationRepository;
    private final UploadedImageRepository imageRepository;
    private final BillEstimateRepository billEstimateRepository;

    // Method to generate a unique ID for each image
    public String generateId() {
        return UUID.randomUUID().toString(); // Generates a unique ID for each image
    }
    @Override
    public PostResponse createPost(CreatePostRequest request, String userEmail){
        Optional<Users> usersOptional = authRepository.findByEmail(userEmail);
        if(usersOptional.isEmpty()){
            throw new DefaultException("User not founded", 404);
        }
        Users users = usersOptional.get();
        // postId generate
        String postId = UUID.randomUUID().toString();

        //  update location from request on location entity;
        Location pickupLocation = locationRepository.save(request.getPickupLocation().toEntity());
        Location dropLocation = locationRepository.save(request.getDropLocation().toEntity());

        Category categoryEnum;
        try{
            categoryEnum = Category.valueOf(request.getCategory().toUpperCase());
        }catch (IllegalArgumentException e){
            throw new DefaultException("Invalid category: " + request.getCategory(), 400);
        }

        Post post = Post.builder()
                .postID(postId)
                .userId(users)
                .title(request.getTitle())
                .description(request.getDescription())
                .weight(request.getWeight())
                .price(request.getPrice())
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .category(categoryEnum)
                .status(PostStatus.PENDING)
                .pickupLocation(pickupLocation)
                .dropLocation(dropLocation)
                // bill
                .build();
        postRepository.save(post);
//        System.out.println("------------> complete post repository "+ postRepository);
        List<UploadedImage> images = request.getImages().stream()
                .map(img -> {
                    // Generate a unique image ID
                    String imageId = generateId();
                    img.setId(imageId); // Assign the generated ID to the image
                    return img.toEntity(post); // Map to the entity object
                })
                .collect(Collectors.toList());
        imageRepository.saveAll(images);

        String billId = generateId();
        BillEstimate billEstimate = BillEstimate.builder()
                .post(post)
                .id(billId)
                .price(post.getPrice())
                .build();
        billEstimateRepository.save(billEstimate);

        post.setImages(images);
        post.setBillEstimate(billEstimate);

        return PostResponse.from(post);
    }

    @Override
    public List<PostResponse> getAllPosts(){
        List<Post> posts = postRepository.findAll();

        return posts.stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse updatePost(String postID, PostUpdateRequest request){
        Post post = postRepository.findById(postID)
                .orElseThrow(()-> new RuntimeException("Post not founded"));


        if (request.getTitle() != null) {
            post.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            post.setDescription(request.getDescription());
        }
        if (request.getWeight() != null) {
            post.setWeight(request.getWeight());
        }
        if (request.getPrice() != null) {
            post.setPrice(request.getPrice());
        }
        if (request.getStatus() != null) {
            post.setStatus(Enum.valueOf(PostStatus.class, request.getStatus()));
        }

        post.setUpdateAt(LocalDateTime.now());

        postRepository.save(post);

        return  PostResponse.from(post);

    }

    @Override
    public void deletePost(String postID){
        Post post = postRepository.findById(postID)
                .orElseThrow(()-> new RuntimeException("Post not founded"));

        postRepository.delete(post);
    }
}
