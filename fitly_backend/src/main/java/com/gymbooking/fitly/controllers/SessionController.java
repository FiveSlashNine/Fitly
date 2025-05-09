package com.gymbooking.fitly.controllers;

import com.gymbooking.fitly.dtos.UserDTO;
import com.gymbooking.fitly.mappers.SessionMapper;
import com.gymbooking.fitly.mappers.UserMapper;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.services.SessionService;
import com.gymbooking.fitly.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.gymbooking.fitly.dtos.SessionDTO;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/sessions")
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;
    private final SessionMapper sessionMapper;
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("getSessions")
    public List<SessionDTO> getSessions(){
        return sessionService.getSessions().stream()
                .map(sessionMapper::map)
                .collect(Collectors.toList());
    }

    @GetMapping("getSession")
    public SessionDTO getSession(@RequestParam Long id){
        Optional<Session> sessionOptional = sessionService.getSessionById(id);
        if (sessionOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No session found with id: " + id);
        }
        return sessionMapper.map(sessionOptional.get());
    }

    @PutMapping("updateSession")
    public SessionDTO updateSession(@RequestBody Session session){
        return sessionMapper.map(sessionService.updateSession(session));
    }

    @PostMapping("createSession")
    public SessionDTO createSession(@RequestBody Session session,@RequestParam Long gymId){
        return sessionMapper.map(sessionService.createSession(session,gymId));
    }

    @DeleteMapping("deleteById")
    public void deleteSessionById(@RequestParam Long id){
        sessionService.deleteSessionById(id);
    }

    @DeleteMapping("deleteGym")
    public void deleteSession(@RequestBody Session session){
        sessionService.deleteSession(session);
    }

    @GetMapping("getSessionUsers")
    public List<UserDTO> getSessionUsers(@RequestParam Long sessionId){
        return userService.getSessionUsers(sessionId).stream()
                .map(userMapper::map)
                .collect(Collectors.toList());
    }

    @GetMapping("getSessionByLocation")
    public List<SessionDTO> getSessionByLocation(@RequestParam String location) {
    List<SessionDTO> sessions = sessionService.getSessionByLocation(location).stream()
            .map(sessionMapper::map)
            .collect(Collectors.toList());

    if (sessions.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Sessions in location: "+location+" not found ");          
    }else return sessions;
}

    @GetMapping("getSessionByLocationAndType")
    public List<SessionDTO> getSessionByLocationAndType(@RequestParam String location,@RequestParam String type){
        List<SessionDTO> sessions = sessionService.getSessionByLocationAndType(location, type).stream()
            .map(sessionMapper::map)
            .collect(Collectors.toList());
            if (sessions.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Sessions in location: "+location+" with type: "+type+" not found ");          
            }else return sessions;

    }
}
