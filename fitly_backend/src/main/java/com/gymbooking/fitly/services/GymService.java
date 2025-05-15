package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.Gym;
import com.gymbooking.fitly.models.GymStatistics;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.repositories.GymRepository;
import com.gymbooking.fitly.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class GymService {

    private final GymRepository gymRepository;
    private final UserRepository userRepository;

    public Gym createGym(Gym gym, Long userId){
        if(!isValidGymName(gym.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid name format");
        }

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + userId);
        gym.setOwnerUser(user.get());
        return gymRepository.save(gym);
    }

    public boolean isValidGymName(String gymName) {
        String gymNameRegex = "^[a-zA-Z0-9._-]{1,20}$";
        Pattern pattern = Pattern.compile(gymNameRegex);
        Matcher matcher = pattern.matcher(gymName);
        return matcher.matches();
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

    public Optional<Gym> getGymByUserId(Long userId) {
        return gymRepository.findAll()
            .stream()
            .filter(gym -> gym.getOwnerUser() != null && gym.getOwnerUser().getId().equals(userId))
            .findFirst();
    }

    public GymStatistics getGymStatistics(Long gymId) {

        if (!gymRepository.existsById(gymId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gym not found");
        }
        
    
        int totalSessions = gymRepository.countSessionsByGymId(gymId);
        int totalParticipants = gymRepository.countParticipantsByGymId(gymId);
        int totalRevenue = gymRepository.calculateTotalRevenueByGymId(gymId);
        
        GymStatistics statistics = new GymStatistics();
        statistics.setTotalSessions(totalSessions);
        statistics.setTotalParticipants(totalParticipants);
        statistics.setTotalRevenue(totalRevenue);
        
        return statistics;
    }
    
}
