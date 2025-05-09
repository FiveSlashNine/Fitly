package com.gymbooking.fitly.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class SecurityUser implements UserDetails {

    private User user;

    public SecurityUser(User user) {
        this.user = user;
    }

    public String getName() {
        if(user!=null) {
            return user.getEmail();
        }
        return "";
    }

    public String getId() {
        if(user!=null) {
            return user.getId().toString();
        }
        return "";
    }

    @Override
    public String getUsername() {
        if(user!=null) {
            return user.getEmail();
        }
        return "";
    }

    @Override
    public String getPassword() {
        if(user!=null) {
            return user.getPassword();
        }
        return "";
    }

    public Boolean needsGym() {
        if(user!=null) {
            return user.getIsGymOwner() && user.getGym()==null;
        }
        return false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(user!=null) {
            return Arrays.stream(user
                            .getRoles()
                            .split(","))
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();

    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}