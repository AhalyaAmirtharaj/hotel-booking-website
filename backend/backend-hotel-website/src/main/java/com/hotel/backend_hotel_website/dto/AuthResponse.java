package com.hotel.backend_hotel_website.dto;



import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private Long userId;
    private String name;
    private String email;
    private String role;
}