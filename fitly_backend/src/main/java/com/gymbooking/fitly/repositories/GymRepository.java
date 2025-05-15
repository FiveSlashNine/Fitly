package com.gymbooking.fitly.repositories;

import com.gymbooking.fitly.models.Gym;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GymRepository extends JpaRepository<Gym, Long> {
    List<Gym> findByLocation(String location);

    @Query("SELECT COUNT(s) FROM Session s WHERE s.gym.id = :gymId")
    int countSessionsByGymId(@Param("gymId") Long gymId);

    @Query("SELECT COUNT(DISTINCT u) FROM Session s JOIN s.sessionHolders u WHERE s.gym.id = :gymId")
    int countParticipantsByGymId(@Param("gymId") Long gymId);

    @Query("SELECT COALESCE(SUM(CAST(REPLACE(s.cost, '$', '') as integer) * SIZE(s.sessionHolders)), 0) " +
           "FROM Session s WHERE s.gym.id = :gymId")
    int calculateTotalRevenueByGymId(@Param("gymId") Long gymId);
}
