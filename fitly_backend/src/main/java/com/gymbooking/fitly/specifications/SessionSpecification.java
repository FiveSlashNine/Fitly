package com.gymbooking.fitly.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.gymbooking.fitly.models.Session;
import com.gymbooking.fitly.models.enums.SessionType;
import com.gymbooking.fitly.models.enums.Status;

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
}
