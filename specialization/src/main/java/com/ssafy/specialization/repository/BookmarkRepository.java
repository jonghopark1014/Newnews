package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("select b from Bookmark b where b.user.id =: userId and b.news.id =:newsId")
    Optional<Bookmark> findBookmarkByUserIdAndNewsId(@Param("userId")Long userId, @Param("newsId")Long newsId);

}
