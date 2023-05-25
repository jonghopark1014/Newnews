package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Modifying
    @Query("delete from Bookmark b where b.news.id = :newsId and b.user.id = :userId")
    int deleteByUserIdAndNewsId(@Param("userId") Long userId, @Param("newsId") Long newsId);
    Optional<Bookmark> findByUserIdAndNewsId(Long userId, Long newsId);
    Optional<Bookmark> findByUserUsernameAndNewsId(String username, Long newsId);
}