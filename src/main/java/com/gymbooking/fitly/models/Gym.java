package com.gymbooking.fitly.models;

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
@Table(name="gyms")
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    private User ownerUser;
    @OneToMany(mappedBy ="gym")
    private List<Session> sessionList;
    private String name;
    private String location;

}
