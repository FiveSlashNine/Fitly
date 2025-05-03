package com.gymbooking.fitly.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gymbooking.fitly.models.Gym;
import com.gymbooking.fitly.models.Session;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String phoneNumber;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String roles;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Gym gym;

    private Boolean isGymOwner;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Session> sessions;
}
