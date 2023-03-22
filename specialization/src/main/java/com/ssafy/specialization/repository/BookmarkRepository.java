package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    void deleteByUserIdAndNewsId(long userId, long newsId);
}
