package com.example.selfcourier.service;


import com.example.selfcourier.model.LoginRequest;
import com.example.selfcourier.model.LoginResponse;
import com.example.selfcourier.model.RegisterRequest;
import com.example.selfcourier.model.RegisterResponse;

public interface AuthService {

     RegisterResponse register(RegisterRequest registerRequest);
     LoginResponse login(LoginRequest loginRequest);
}
