package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.dtype.Politics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PoliticsRepository extends JpaRepository<Politics, Long> {

    @Query(value = "select p from Politics p join fetch p.newsImageList" , countQuery = "select count(p) from Politics p")
    Page<News> findAllWithCategory(Pageable pageable);

    @Query(value = "select p from Politics p join fetch p.newsImageList where p.id = :newsId")
    Optional<News> findWithImageListByNewsId(@Param("newsId") Long newsId);
}
