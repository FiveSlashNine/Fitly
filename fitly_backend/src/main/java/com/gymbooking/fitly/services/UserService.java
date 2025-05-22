package com.gymbooking.fitly.services;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymbooking.fitly.TokenUtil;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.models.enums.Status;
import com.gymbooking.fitly.repositories.SessionRepository;
import com.gymbooking.fitly.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        if (!isValidEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email format");
        }

        if(!isValidUsername(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username format");
        }

        if (user.getPassword().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters long");
        }

        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        if (userOptional.isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles("SIMPLE");
            userRepository.save(user);
            return user;
        }
        throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Email is used from another user");
    }

    public boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9._-]{1,20}$";
        Pattern pattern = Pattern.compile(usernameRegex);
        Matcher matcher = pattern.matcher(username);
        return matcher.matches();
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
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
        if(session.getStatus()==Status.CANCELLED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session with id: " + userId + " has been cancelled.");
        }

        User user = userOptional.get();
        if (session.getSessionHolders().contains(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is already enrolled in the session.");
        }

        if (session.getSessionHolders().size() > session.getCapacity()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session is full.");
        }

        user.addSession(session);
        session.addUser(user);

        if(session.getCapacity()==0) session.setStatus(Status.FULL);

        sessionRepository.save(session);
        return userRepository.save(user); 
    }

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

        if(session.getStatus()==Status.FULL) session.setStatus(Status.ACTIVE);

        sessionRepository.save(session);
        return userRepository.save(user);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try {
                DecodedJWT decodedJWT = TokenUtil.getDecodedJWTfromToken(authorizationHeader);
                String email = decodedJWT.getSubject();

                Optional<User> user = userRepository.findByEmail(email);
                if(user.isEmpty()) throw new RuntimeException("User with this email doesn't exist");
                List<String> roles = Arrays.stream(user.get().getRoles().split(",")).collect(Collectors.toList());
                String name = user.get().getEmail();
                String id = user.get().getId().toString();

                String accessToken = TokenUtil.generateAccessToken(email, request.getRequestURL(), id, name, roles);
                String refreshToken = TokenUtil.generateRefreshToken(email, request.getRequestURL());

                Map<String,String> tokens= new HashMap<>();
                tokens.put("accessToken", accessToken);
                tokens.put("refreshToken", refreshToken);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            }
            catch (Exception e){
                System.err.println("Error with token: "+e.getMessage());
                response.setHeader("error",e.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String,String> error= new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
        else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
