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
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String phoneNumber;
    private String email;
    private String password;
    private Boolean isGymOwner;
    private String roles;

    @OneToOne(mappedBy = "ownerUser",cascade = CascadeType.ALL)
    @JsonIgnore
    private Gym gym;

    @ManyToMany(mappedBy = "sessionHolders")
    private List<Session> sessions;

    public User(String username, String phoneNuber, String email, String password, boolean isGymOwner) {
        this.username = username;
        this.phoneNumber = phoneNuber;
        this.email = email;
        this.password = password;
        this.isGymOwner = isGymOwner;
    }

    public void addSession(Session session) {
        sessions.add(session);
    }

    public void removeSession(Session session) {
        sessions.remove(session);
    }
}
