package com.gymbooking.fitly.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="sessions")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="gym_id", referencedColumnName="id")
    @JsonIgnore
    private Gym gym;



}
