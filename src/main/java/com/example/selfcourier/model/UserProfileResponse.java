package com.example.selfcourier.model;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    private String name;
    private String email;
    private String role;
    private String address;
    private String phone;
    private Long userId;
}
