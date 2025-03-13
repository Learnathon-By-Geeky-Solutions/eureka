package com.example.selfcourier.model;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    public String name;
    public String email;
    public String role;
    public String address;
    public String phone;
    public Long user_id;
}
