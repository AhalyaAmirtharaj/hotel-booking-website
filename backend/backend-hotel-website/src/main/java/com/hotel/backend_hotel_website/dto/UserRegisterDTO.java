package com.hotel.backend_hotel_website.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank
    @Email(message = "Enter valid email")
    private String email;

    @NotBlank
    @Size(min = 6, message = "Password min 6 chars")
    private String password;

    @NotBlank
    @Pattern(regexp = "[0-9]{10}", message = "Phone must be 10 digits")
    private String phone;
}
