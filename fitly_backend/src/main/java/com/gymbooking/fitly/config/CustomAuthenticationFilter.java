package com.gymbooking.fitly.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymbooking.fitly.TokenUtil;
import com.gymbooking.fitly.models.SecurityUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager=authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(email,password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        SecurityUser securityUser= (SecurityUser) authentication.getPrincipal();
        String accessToken = TokenUtil.generateAccessToken(securityUser.getUsername(), request.getRequestURL(), securityUser.getId(), securityUser.getName(), securityUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        String refreshToken = TokenUtil.generateRefreshToken(securityUser.getUsername(), request.getRequestURL());

        Map<String,String> tokens= new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        tokens.put("userId", securityUser.getId());
        tokens.put("needsGym", securityUser.needsGym().toString());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}