package com.gymbooking.fitly.repositories;

import com.gymbooking.fitly.models.Gym;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRepository extends JpaRepository<Gym, Long> {
    List<Gym> findByLocation(String location);
}
