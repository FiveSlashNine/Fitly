package com.gymbooking.fitly.controllers;

import com.gymbooking.fitly.dtos.UserDTO;
import com.gymbooking.fitly.mappers.SessionMapper;
import com.gymbooking.fitly.mappers.UserMapper;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.enums.SessionType;
import com.gymbooking.fitly.models.enums.Status;
import com.gymbooking.fitly.services.SessionService;
import com.gymbooking.fitly.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.gymbooking.fitly.dtos.SessionDTO;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;

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

    @GetMapping("/public/getSessions")
    public Page<SessionDTO> getSessions(
        @RequestParam(required = false) String location,
        @RequestParam(required = false) SessionType type,
        @RequestParam(required = false) Status status,
        @RequestParam(required = false) String searchQuery,
        @PageableDefault(size = 10, sort = {"date", "status", "cost", "capacity"}, direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return sessionMapper.toDTOPage(sessionService.getSessions(location, type, status, searchQuery, pageable));
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

    @PutMapping("updateSessionStatus")
    public SessionDTO updateSessionStatus(@RequestParam Long sessionid,@RequestParam Status newStatus){
        return sessionMapper.map(sessionService.updateSessionStatus(sessionid,newStatus));
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

    @GetMapping("getSessionsByOwnerId")
    public List<SessionDTO> getSessionsByOwnerId(@RequestParam Long userId) {
        return sessionService.getSessionsByOwnerId(userId).stream()
                .map(sessionMapper::map)
                .collect(Collectors.toList());
    }
}
