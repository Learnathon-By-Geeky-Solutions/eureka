package com.example.selfcourier.service;



import com.example.selfcourier.config.JwtService;
import com.example.selfcourier.entity.Users;
import com.example.selfcourier.error.DefaultException;
import com.example.selfcourier.model.*;
import com.example.selfcourier.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;


    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
//        if (authRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
//            throw new DefaultException("The associated email already exist", HttpStatus.BAD_REQUEST.value());
//        }
        val user = Users.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .address(registerRequest.getAddress())
                .phone(registerRequest.getPhone())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        authRepository.save(user);
        val jwtToken = jwtService.generateToken(user);
        return RegisterResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .name(user.getName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        val user = authRepository.findByEmail(loginRequest.getEmail());
        if (user.isEmpty()) {
            throw new DefaultException("User not found with this email", 404);
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            throw new DefaultException("Password is incorrect", HttpStatus.BAD_REQUEST.value());
        }
        authManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword(),
                user.get().getAuthorities()
        ));
        val jwtToken = jwtService.generateToken(user.get());
        return LoginResponse.builder()
                .token(jwtToken)
                .email(user.get().getEmail())
                .userId(user.get().getUserId())
                .role(user.get().getRole().name())
                .name(user.get().getName())
                .build();
    }

    @Override
    public  UserProfileResponse getUserProfile(String email){
        Optional<Users> usersOptional = authRepository.findByEmail(email);
        if(usersOptional.isEmpty()){
            throw new DefaultException("User not found with this email", 404);
        }
        Users user = usersOptional.get();

        return UserProfileResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .userId(user.getUserId())
                .role(user.getRole().name())
                .build();
    }
}
