package com.gymbooking.fitly.services;

import com.gymbooking.fitly.dtos.GymDTO;
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

import java.util.ArrayList;
import java.util.List;
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
        
        Optional<Session> existingSession = sessionRepository.findById(session.getId());
        if (existingSession.isPresent()) {
            Session existing = existingSession.get();
            session.setGym(existing.getGym());
            session.setSessionHolders(existing.getSessionHolders());
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

    public List<Session> getSessionByLocation(String location) {
        List<Gym> gymsWithLocation=gymRepository.findByLocation(location);
        List<Session> sessionsWithLocation = new ArrayList<>();
        for (Gym gym : gymsWithLocation){
            sessionsWithLocation.addAll(gym.getSessionList());
        }
        return sessionsWithLocation;
    }

    public List<Session> getSessionByLocationAndType(String location, String type) {
        List<Gym> gymsWithLocation = gymRepository.findByLocation(location);
        List<Session> sessionsWithLocationAndType = new ArrayList<>();

        for (Gym gym : gymsWithLocation) {
            for (Session session : gym.getSessionList()) {
             if (type.equals("ALL") || session.getType().name().equals(type)) {
                  sessionsWithLocationAndType.add(session);
             }
            }
        }

    return sessionsWithLocationAndType;

}
  
public List<Session> getSessionsByOwnerId(Long userId) {
    Optional<Gym> gymOptional = gymRepository.findAll()
        .stream()
        .filter(gym -> gym.getOwnerUser() != null && gym.getOwnerUser().getId().equals(userId))
        .findFirst();
    if (gymOptional.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No gym found for user id: " + userId);
    }
    return gymOptional.get().getSessionList();
}

public Session updateSessionStatus(Long sessionid, Status newStatus) {
    if (!sessionRepository.existsById(sessionid)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No session found with id: " + sessionid);
    }
    Optional<Session> sessionOptional = sessionRepository.findById(sessionid);
    Session session = sessionOptional.get();
    session.setStatus(newStatus);
    return sessionRepository.save(session);
}
}
