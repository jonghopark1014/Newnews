package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {

    @Query("select n from Bookmark b inner join b.news n where b.user.id = :userId")
    List<News> findBookmarkedNewsByUserId(@Param("userId")Long userId);

}
