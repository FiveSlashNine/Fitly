package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.Gym;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.repositories.GymRepository;
import com.gymbooking.fitly.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GymService {

    private final GymRepository gymRepository;
    private final UserRepository userRepository;

    public Gym createGym(Gym gym, Long userId){
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        gym.setOwnerUser(user.get());
        return gymRepository.save(gym);
    }

    public List<Gym> getGyms() {
        return gymRepository.findAll();
    }

    public Optional<Gym> getGymById(Long id) {
        return gymRepository.findById(id);
    }

    public void deleteGymById(Long id) {
        gymRepository.deleteById(id);
    }

    public void deleteGym(Gym gym) {
        gymRepository.delete(gym);
    }

    public Gym updateGym(Gym gym) {
        return gymRepository.save(gym);
    }

    public Gym updateGymById(Long id,String location,String name) {
        Optional<Gym> gymOptional = gymRepository.findById(id);
        if (gymOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No gym found with id: " + id);
        }

        Gym gym = gymOptional.get();
        if (location!=null) gym.setLocation(location);
        if (name!=null) gym.setName(name);

        return gym;
    }
}
