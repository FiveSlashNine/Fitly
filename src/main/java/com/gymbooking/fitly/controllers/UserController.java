package com.gymbooking.fitly.controllers;

import com.gymbooking.fitly.dtos.UserDTO;
import com.gymbooking.fitly.mappers.UserMapper;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public UserDTO createUser(@RequestBody User user) {
        return userMapper.map(userService.createUser(user));
    }

    @PutMapping("updateUser")
    public UserDTO updateUser(@RequestBody User user) {
        return userMapper.map(userService.updateUser(user));
    }

    @PutMapping("updateUserCredentialsWithId")
    public UserDTO updateUser(@RequestParam Long id,
                              @RequestParam(required = false) String username,
                              @RequestParam(required = false) String email,
                              @RequestParam(required = false) String phoneNumber,
                              @RequestParam(required = false) String password) {
        return userMapper.map(userService.updateUserById(id, username, email, phoneNumber, password));
    }
    @PutMapping("updateUserSessionList")
    public UserDTO updateUserSessionList(@RequestParam Long userId,@RequestParam Long sessionId) {
        return userMapper.map(userService.updateUserSessionList(userId,sessionId));
    }

    @GetMapping("getUsers")
    public List<UserDTO> getUsers() {
        return userService.getUsers().stream()
                .map(userMapper::map)
                .collect(Collectors.toList());
    }

    @GetMapping("getUserById")
    public UserDTO getUserById(@RequestParam("id") Long id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + id);
        }

        return userMapper.map(userOptional.get());
    }

    @DeleteMapping("deleteUserById")
    public void deleteUserById(@RequestParam("id") Long id) {
        userService.deleteUserById(id);
    }

    @DeleteMapping("deleteUser")
    public void deleteUserById(@RequestBody User user) {
        userService.deleteUser(user);
    }

    @PutMapping("removeUserFromSession")
    public UserDTO removeUserFromSession(@RequestParam Long userId,@RequestParam Long sessionId) {
        return userMapper.map(userService.removeUserFromSession(userId,sessionId));
    }

}