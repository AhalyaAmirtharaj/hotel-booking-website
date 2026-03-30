package com.hotel.backend_hotel_website.service;

import com.hotel.backend_hotel_website.entity.Hotel;
import com.hotel.backend_hotel_website.entity.Room;
import com.hotel.backend_hotel_website.repository.HotelRepository;
import com.hotel.backend_hotel_website.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public List<Hotel> searchByLocation(String location) {
        return hotelRepository.findByLocationContainingIgnoreCase(location);
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found!"));
    }

    public List<Room> getAvailableRooms(Long hotelId) {
        return roomRepository.findByHotelIdAndIsAvailableTrue(hotelId);
    }

    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }
}
}
