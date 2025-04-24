package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.repositories.SessionRepository;
import com.gymbooking.fitly.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    public User createUser(User user){
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User updateUserById(Long id, String username, String email, String phoneNumber, String password) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + id);
        }

        User u = userOptional.get();
        if(username != null) u.setUsername(username);
        if(email != null) u.setEmail(email);
        if(phoneNumber != null) u.setPhoneNumber(phoneNumber);
        if(password != null) u.setPassword(password);

        return u;
    }

    public User updateUserSessionList(Long userId, Long sessionId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        }
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No session found with id: " + sessionId);
        }
        Session session = sessionOptional.get();
        User user = userOptional.get();
        if (session.getSessionHolders().contains(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is already enrolled in the session.");
        }

        if (session.getSessionHolders().size() >= session.getCapacity()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session is full.");
        }

        user.addSession(session);
        session.addUser(user);

        sessionRepository.save(session);
        return userRepository.save(user); }

    public List<User> getSessionUsers(Long sessionId) {
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No session found with id: " + sessionId);
        Session session = sessionOptional.get();
        return session.getSessionHolders();
    }

    public User removeUserFromSession(Long userId, Long sessionId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        }
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No session found with id: " + sessionId);
        }
        Session session = sessionOptional.get();
        User user = userOptional.get();
        if (!session.getSessionHolders().contains(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not enrolled in this session.");
        }
        user.removeSession(session);
        session.removeUser(user);
        sessionRepository.save(session);
        return userRepository.save(user);
    }
}
