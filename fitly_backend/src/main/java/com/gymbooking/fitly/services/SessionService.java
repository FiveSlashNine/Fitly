package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.Gym;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.enums.SessionType;
import com.gymbooking.fitly.models.enums.Status;
import com.gymbooking.fitly.repositories.GymRepository;
import com.gymbooking.fitly.repositories.SessionRepository;
import com.gymbooking.fitly.specifications.SessionSpecification;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final GymRepository gymRepository;
 
    public Page<Session> getSessions(String location, SessionType type, Status status, String searchQuery, Pageable pageable) {
        Specification<Session> spec = Specification.where(null);

        if (location != null && !location.isEmpty()) {
            spec = spec.and(SessionSpecification.hasLocation(location));
        }

        if (type != null) {
            spec = spec.and(SessionSpecification.hasType(type));
        }

        if (status != null) {
            spec = spec.and(SessionSpecification.hasStatus(status));
        }

        if (searchQuery != null && !searchQuery.isEmpty()) {
            spec = spec.and(SessionSpecification.hasSearch(searchQuery));
        }

        return sessionRepository.findAll(spec, pageable);
    }

    public Optional<Session> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    public Session updateSession(Session session) {
        if (!sessionRepository.existsById(session.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No session found with id: " + session.getId());
        }
        return sessionRepository.save(session);
    }

    public void deleteSession(Session session) {
        sessionRepository.delete(session);
    }

    public void deleteSessionById(Long id) {
        sessionRepository.deleteById(id);
    }


    public Session createSession(Session session, Long gymId) {
        Optional<Gym> gym = gymRepository.findById(gymId);
        if (gym.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No gym found with id: " + gymId);
        session.setGym(gym.get());
        return sessionRepository.save(session);
    }
}
