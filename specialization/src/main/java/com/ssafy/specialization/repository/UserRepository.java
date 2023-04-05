package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select u from User u join fetch u.bookmarkList ub join fetch ub.news where u.username = :username")
    Optional<User> findWithBookmarkByUsername(String username);

    @Query("select u from User u join fetch u.watchedList where u.id = :userId")
    User findWatchedListById(@Param("userId") Long userId);
}
