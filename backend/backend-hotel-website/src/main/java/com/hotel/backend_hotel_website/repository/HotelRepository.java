package com.hotel.backend_hotel_website.repository;

import com.hotel.backend_hotel_website.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.ScopedValue;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    List<Hotel> findByLocationContainingIgnoreCase(String location);
}