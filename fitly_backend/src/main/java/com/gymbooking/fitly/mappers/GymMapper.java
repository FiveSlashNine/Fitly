package com.gymbooking.fitly.mappers;

import com.gymbooking.fitly.dtos.GymDTO;
import com.gymbooking.fitly.models.Gym;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GymMapper {
    GymDTO map(Gym gym);

    @InheritInverseConfiguration
    Gym map(GymDTO gymDTO);
}
