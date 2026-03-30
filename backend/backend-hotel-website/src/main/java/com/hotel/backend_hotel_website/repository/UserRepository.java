package com.hotel.backend_hotel_website.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.backend_hotel_website.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}