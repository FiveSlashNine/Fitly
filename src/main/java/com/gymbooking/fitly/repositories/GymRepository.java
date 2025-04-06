package com.gymbooking.fitly.repositories;

import com.gymbooking.fitly.models.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRepository extends JpaRepository<Gym, Long> {
}
