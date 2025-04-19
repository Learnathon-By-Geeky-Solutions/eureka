package com.example.selfcourier.service;


import com.example.selfcourier.model.*;

public interface AuthService {

     RegisterResponse register(RegisterRequest registerRequest);
     LoginResponse login(LoginRequest loginRequest);
     UserProfileResponse getUserProfile(String email);
}
