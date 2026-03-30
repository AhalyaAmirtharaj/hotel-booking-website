package com.hotel.backend_hotel_website.controller;

import com.hotel.backend_hotel_website.dto.BookingRequestDTO;
import com.hotel.backend_hotel_website.entity.Booking;
import com.hotel.backend_hotel_website.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking book(@RequestBody BookingRequestDTO dto) {
        return bookingService.bookRoom(dto);
    }

    @PutMapping("/{id}/cancel")
    public Booking cancel(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookings(@PathVariable Long userId) {
        return bookingService.getMyBookings(userId);
    }
}

