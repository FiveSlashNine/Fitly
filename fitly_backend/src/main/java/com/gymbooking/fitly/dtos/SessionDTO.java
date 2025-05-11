package com.gymbooking.fitly.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.models.enums.Status;
import com.gymbooking.fitly.models.enums.SessionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionDTO {
    private Long id;
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private SessionType type;
    private String date;
    private String cost;
    private String startTime;
    private String endTime;
    private int capacity;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String imageUrl;

    private GymDTO gym;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<User> sessionHolders;
}
