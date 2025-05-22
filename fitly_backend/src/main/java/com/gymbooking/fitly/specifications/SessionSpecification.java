package com.gymbooking.fitly.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.User;
import com.gymbooking.fitly.models.enums.SessionType;
import com.gymbooking.fitly.models.enums.Status;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class SessionSpecification {
    public static Specification<Session> hasLocation(String location) {
        return (root, query, cb) -> cb.equal(root.get("gym").get("location"), location);
    }

    public static Specification<Session> hasType(SessionType type) {
        return (root, query, cb) -> cb.equal(root.get("type"), type);
    }

    public static Specification<Session> hasStatus(Status status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Session> hasSearch(String searchQuery) {
        return (root, query, cb) -> {
            String likePattern = "%" + searchQuery.toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("title")), likePattern),
                cb.like(cb.lower(root.get("description")), likePattern)
            );
        };
    }

    public static Specification<Session> hasSessionHolder(Long userId) {
        return (root, query, cb) -> {
            Join<Session, User> join = root.join("sessionHolders", JoinType.INNER);
            return cb.equal(join.get("id"), userId);
        };
    }

    public static Specification<Session> hasNoSessionHolder(Long userId) {
        return (root, query, cb) -> {
            Join<Session, User> join = root.join("sessionHolders", JoinType.LEFT);
            join.on(cb.equal(join.get("id"), userId));
            return cb.isNull(join.get("id"));
        };
    }

    public static Specification<Session> hasGymOwner(Long userId) {
        return (root, query, cb) -> cb.equal(root.get("gym").get("ownerUser").get("id"), userId);
    }
}
