package com.example.selfcourier.controller;


import com.example.selfcourier.config.JwtService;
import com.example.selfcourier.error.DefaultException;
import com.example.selfcourier.model.*;
import com.example.selfcourier.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;




@RequestMapping("/api/v1")
@RestController
//@CrossOrigin(origins = "*", )
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private  final JwtService jwtService;

    @Value("${cors.allowOrigin}")
    private String allowOrigin;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Self Courier System";
    }

    @PostMapping("/auth/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest , HttpServletResponse response) throws DefaultException {
        addCorsHeaders(response);
        return ResponseEntity.status(201).body(authService.register(registerRequest));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) throws DefaultException {
        addCorsHeaders(response);
        System.out.println("--------> log in request :  " + loginRequest+ " response "+ response);
        return ResponseEntity.status(200).body(authService.login(loginRequest));
    }

    @GetMapping("/auth/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile(HttpServletRequest request) throws DefaultException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();  // Missing Bearer token
        }

        String token = authHeader.substring(7);  // Remove "Bearer "
        String email = null;

        try {
            email = jwtService.extractUserName(token);  // Extract the username (email) from the token
        } catch (Exception e) {

            return ResponseEntity.status(401).build();  // Token extraction failed
        }



        if (email == null) {
            return ResponseEntity.status(401).build();  // Invalid token or email
        }

        // Fetch user profile using the extracted email
        UserProfileResponse userProfile = authService.getUserProfile(email);

        if (userProfile == null) {
            return ResponseEntity.status(404).build();  // User not found
        }

        return ResponseEntity.ok(userProfile);  // Return the user profile
    }

    private void addCorsHeaders(HttpServletResponse response){
        String[] origins = allowOrigin.split(",");
        for(String origin:origins){
            response.addHeader("Access-Control-Allow-Origin", origin.trim());
        }
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.addHeader("Access-Control-Allow-Credentials", "true");
    }

}
