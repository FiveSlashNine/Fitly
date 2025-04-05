package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.User;
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
}
