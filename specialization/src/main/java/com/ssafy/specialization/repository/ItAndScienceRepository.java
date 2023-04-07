package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.dtype.ItAndScience;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ItAndScienceRepository extends JpaRepository<ItAndScience, Long> {

    @Query(value = "select i from ItAndScience i join fetch i.newsImageList",countQuery = "select count(i) from ItAndScience i")
    Page<News> findAllWithCategory(Pageable pageable);

    @Query(value = "select i from ItAndScience i join fetch i.newsImageList where i.id = :newsId")
    Optional<News> findWithImageListByNewsId(@Param("newsId") Long newsId);
}
