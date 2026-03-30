package com.hotel.backend_hotel_website.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

    private Long userId;
    private Long roomId;
    private String checkIn;
    private String checkOut;
}
