package com.gymbooking.fitly.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GymStatistics {
    private int totalSessions;
    private int totalParticipants;
    private double totalRevenue;
}
