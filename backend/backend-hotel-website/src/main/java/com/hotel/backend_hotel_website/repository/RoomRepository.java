package com.hotel.backend_hotel_website.repository;

import com.hotel.backend_hotel_website.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHotelId(Long hotelId);

    List<Room> findByHotelIdAndIsAvailableTrue(Long hotelId);
}