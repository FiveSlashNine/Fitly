package com.gymbooking.fitly.repositories;

import com.gymbooking.fitly.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
}
