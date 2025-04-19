package com.example.selfcourier.controller;


import com.example.selfcourier.service.ImageKitService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/imagekit")
public class ImageKitController {
    private final ImageKitService imageKitService;

    public  ImageKitController(ImageKitService imageKitService){
        this.imageKitService = imageKitService;
    }

    @PostMapping("/auth")
    public Map<String, String> getImageKitAuth(){
        return imageKitService.generateAuth();
    }
}
