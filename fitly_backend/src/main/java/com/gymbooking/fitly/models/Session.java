package com.gymbooking.fitly.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.gymbooking.fitly.models.enums.SessionType;
import com.gymbooking.fitly.models.enums.Status;
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "gym_id", referencedColumnName = "id")
    @JsonIgnore
    private Gym gym;

    @ManyToMany
    @JoinTable(name = "booked_sessions", joinColumns = @JoinColumn(name = "session_id"), inverseJoinColumns =
    @JoinColumn(name = "user_id"))
    private List<User> sessionHolders;


    public void addUser(User user) {
        if (capacity > 0) {
            sessionHolders.add(user);
            capacity--;
        }
    }

    public void removeUser(User user) {
        sessionHolders.remove(user);
        capacity++;
    }
}