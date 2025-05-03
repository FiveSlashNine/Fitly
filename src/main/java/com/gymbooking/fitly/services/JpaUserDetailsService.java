package com.gymbooking.fitly.services;

import com.gymbooking.fitly.models.SecurityUser;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional= userRepository.findByEmail(username);
        if(userOptional.isPresent()) {
            return new SecurityUser(userOptional.get());
        }

        throw new UsernameNotFoundException("Email not found: " + username);
    }
}