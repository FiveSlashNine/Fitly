package com.gymbooking.fitly.repositories;

import com.gymbooking.fitly.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SessionRepository extends JpaRepository<Session, Long>, JpaSpecificationExecutor<Session> {
}
