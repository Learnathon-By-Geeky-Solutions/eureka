package com.example.selfcourier.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    public String name;
    public String email;
    public String password;
    public String address;
    public String phone;
}
