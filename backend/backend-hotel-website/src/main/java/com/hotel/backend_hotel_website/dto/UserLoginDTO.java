package com.hotel.backend_hotel_website.dto;


import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginDTO {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
