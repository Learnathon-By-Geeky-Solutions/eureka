package com.example.selfcourier.controller;


import com.example.selfcourier.error.DefaultException;
import com.example.selfcourier.model.LoginRequest;
import com.example.selfcourier.model.LoginResponse;
import com.example.selfcourier.model.RegisterRequest;
import com.example.selfcourier.model.RegisterResponse;
import com.example.selfcourier.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Self Courier System";
    }

    @PostMapping("/auth/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) throws DefaultException {
        return ResponseEntity.status(201).body(authService.register(registerRequest));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) throws DefaultException {
        return ResponseEntity.status(200).body(authService.login(loginRequest));
    }
}
