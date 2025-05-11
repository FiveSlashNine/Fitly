package com.gymbooking.fitly.mappers;

import com.gymbooking.fitly.dtos.UserDTO;
import com.gymbooking.fitly.models.User;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO map(User user);

    @InheritInverseConfiguration
    User map(UserDTO userDTO);
}
