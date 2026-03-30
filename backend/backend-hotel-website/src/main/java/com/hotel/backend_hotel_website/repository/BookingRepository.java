package com.hotel.backend_hotel_website.repository;

import com.hotel.backend_hotel_website.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByUserId(Long userId);
}
