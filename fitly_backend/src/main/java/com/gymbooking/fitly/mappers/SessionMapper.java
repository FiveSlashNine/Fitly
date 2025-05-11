package com.gymbooking.fitly.mappers;

import com.gymbooking.fitly.dtos.SessionDTO;
import com.gymbooking.fitly.models.Session;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = GymMapper.class)
public interface SessionMapper {
    SessionDTO map(Session session);

    @InheritInverseConfiguration
    Session map(SessionDTO dto);
}
