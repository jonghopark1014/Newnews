package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    int deleteByUserIdAndNewsId(Long userId, Long newsId);
    Optional<Bookmark> findByUserIdAndNewsId(Long userId, Long newsId);
}
