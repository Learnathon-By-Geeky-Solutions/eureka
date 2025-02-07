package com.example.selfcourier.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponse {
    public String token;
    public String name;
    public String email;
    public String role;
    public String address;
    public String phone;
}
