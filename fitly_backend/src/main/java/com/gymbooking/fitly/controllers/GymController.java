package com.gymbooking.fitly.controllers;

import com.gymbooking.fitly.dtos.GymDTO;
import com.gymbooking.fitly.mappers.GymMapper;
import com.gymbooking.fitly.models.Gym;
import com.gymbooking.fitly.services.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/gyms")
@RequiredArgsConstructor
public class GymController {
    private final GymService gymService;
    private final GymMapper gymMapper;

    @PostMapping
    public GymDTO createGym(@RequestBody Gym gym,@RequestParam Long userId) {
        return gymMapper.map(gymService.createGym(gym,userId));
    }

    @PutMapping("updateGym")
    public GymDTO updateGym(@RequestBody Gym gym) {
        return gymMapper.map(gymService.updateGym(gym));
    }

    @PutMapping("updateGymCredentialsWithId")
    public GymDTO updateGym(@RequestParam Long id,
                              @RequestParam(required = false) String gymname,
                              @RequestParam(required = false) String gymLocation) {
        return gymMapper.map(gymService.updateGymById(id, gymLocation,gymname));
    }

    @GetMapping("getGyms")
    public List<GymDTO> getGyms() {
        return gymService.getGyms().stream()
                .map(gymMapper::map)
                .collect(Collectors.toList());
    }

    @GetMapping("getGymById")
    public GymDTO getGymById(@RequestParam("id") Long id) {
        Optional<Gym> gymOptional = gymService.getGymById(id);
        if (gymOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No gym found with id: " + id);
        }

        return gymMapper.map(gymOptional.get());
    }

    @DeleteMapping("deleteGymById")
    public void deleteGymById(@RequestParam("id") Long id) {
        gymService.deleteGymById(id);
    }

    @DeleteMapping("deleteGym")
    public void deleteGym(@RequestBody Gym gym) {
        gymService.deleteGym(gym);
    }
}

