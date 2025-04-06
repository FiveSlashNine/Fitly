package com.gymbooking.fitly.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GymDTO {
    private Long id;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User ownerUser;
    private List<Session> sessionList;
    private String name;
    private String location;

}
