package com.gymbooking.fitly.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gymbooking.fitly.models.Gym;
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
public class SessionDTO {
    private Long id;
    private String title;
    private String description;
    private String type;
    private String date;
    private String cost;
    private String startTime;
    private String endTime;
    private int capacity;
    private String status;

    private Gym gym;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<User> sessionHolders;
}
