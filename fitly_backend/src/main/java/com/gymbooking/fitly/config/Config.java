package com.gymbooking.fitly.config;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.services.UserService;
import com.gymbooking.fitly.TokenUtil;


@Configuration
public class Config {

	@Bean
	public CommandLineRunner commandLineRunner(
			UserService userService) {
		return args -> {
			User admin = userService.createUser(new User("admin", "1", "admin@gmail.com", "123456", true));
			admin.setRoles("PRIVILEGED");
			admin = userService.updateUser(admin);
			List<String> roles = Arrays.stream(admin.getRoles().split(",")).collect(Collectors.toList());
			System.out.println("\n---------ADMIN CREDENTIALS---------\n");
			System.out.println("AccessToken: " + TokenUtil.generateAccessToken(admin.getEmail(), new StringBuffer(), admin.getId().toString(), admin.getUsername(), roles));
			System.out.println("RefressToken: " + TokenUtil.generateRefreshToken(admin.getUsername(), new StringBuffer()));
		};
	}
}
