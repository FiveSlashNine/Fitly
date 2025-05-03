package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.Gym;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.repositories.GymRepository;
import com.gymbooking.fitly.repositories.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final GymRepository gymRepository;


    public List<Session> getSessions() {
        return sessionRepository.findAll();
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
