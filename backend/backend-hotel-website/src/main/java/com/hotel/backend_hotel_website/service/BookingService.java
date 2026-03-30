package com.hotel.backend_hotel_website.service;

import com.hotel.backend_hotel_website.dto.BookingRequestDTO;
import com.hotel.backend_hotel_website.entity.Booking;
import com.hotel.backend_hotel_website.entity.Room;
import com.hotel.backend_hotel_website.repository.BookingRepository;
import com.hotel.backend_hotel_website.repository.RoomRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {
    @Autowired private BookingRepository bookingRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RoomRepository roomRepository;


    public Booking bookRoom(BookingRequestDTO dto) {


        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));


        if (!room.isAvailable()) {
            throw new RuntimeException("Room is not available!");
        }


        LocalDate checkIn = LocalDate.parse(dto.getCheckIn());
        LocalDate checkOut = LocalDate.parse(dto.getCheckOut());


        if (!checkOut.isAfter(checkIn)) {
            throw new RuntimeException("Check-out must be after check-in!");
        }


        long days = ChronoUnit.DAYS.between(checkIn, checkOut);
        double total = days * room.getPrice();


        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckIn(checkIn);
        booking.setCheckOut(checkOut);
        booking.setTotalAmount(total);
        booking.setStatus("CONFIRMED");


        Booking saved = bookingRepository.save(booking);


        room.setAvailable(false);
        roomRepository.save(room);

        return saved;
    }


    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Already cancelled!");
        }

        booking.setStatus("CANCELLED");


        Room room = booking.getRoom();
        room.setAvailable(true);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }
}