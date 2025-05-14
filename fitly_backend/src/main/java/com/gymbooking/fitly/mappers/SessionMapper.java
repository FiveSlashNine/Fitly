package com.gymbooking.fitly.mappers;

import com.gymbooking.fitly.dtos.SessionDTO;
import com.gymbooking.fitly.models.Session;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = GymMapper.class)
public interface SessionMapper {
    SessionDTO map(Session session);

    @InheritInverseConfiguration
    Session map(SessionDTO dto);

    default Page<SessionDTO> toDTOPage(Page<Session> sessions) {
        List<SessionDTO> sessionDTOs = sessions.getContent().stream()
                .map(this::map) 
                .collect(Collectors.toList());
        return new PageImpl<>(sessionDTOs, sessions.getPageable(), sessions.getTotalElements());
    }
}
