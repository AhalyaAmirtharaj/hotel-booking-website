package com.hotel.backend_hotel_website.controller;

import com.hotel.backend_hotel_website.entity.Hotel;
import com.hotel.backend_hotel_website.entity.Room;
import com.hotel.backend_hotel_website.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {
    @Autowired
    private HotelService hotelService;

    @GetMapping("/hotels")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/hotels/search")
    public List<Hotel> search(@RequestParam String location) {
        return hotelService.searchByLocation(location);
    }

    @GetMapping("/rooms/{hotelId}")
    public List<Room> getRooms(@PathVariable Long hotelId) {
        return hotelService.getAvailableRooms(hotelId);
    }
}

