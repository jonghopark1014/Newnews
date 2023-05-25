package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select u from User u join fetch u.bookmarkList ub join fetch ub.news ubn where u.username = :username")
    Optional<User> findWithBookmarkByUsername(String username);

    @Query("select u, uw from User u left join fetch u.watchedList uw where u.id = :userId")
    Optional<User> findWatchedListById(@Param("userId") Long userId);

    @Query("select u from User u left join fetch u.searchHistoryList where u.username = :username")
    Optional<User> findWithSearchHistoryByUsername(@Param("username") String username);
}
