package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.dtype.LifeAndCulture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LifeAndCultureRepository extends JpaRepository<LifeAndCulture, Long> {

    @Query(value = "select l from LifeAndCulture l join fetch l.newsImageList", countQuery = "select count(l) from LifeAndCulture l")
    Page<News> findAllWithCategory(Pageable pageable);

    @Query(value = "select l from LifeAndCulture l join fetch l.newsImageList where l.id = :newsId")
    Optional<News> findWithImageListByNewsId(@Param("newsId") Long newsId);
}
