package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.dtype.Society;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SocietyRepository extends JpaRepository<Society, Long> {

    @Query(value = "select s from Society s join fetch s.newsImageList" , countQuery = "select count(s) from Society s")
    Page<News> findAllWithCategory(Pageable pageable);

    @Query(value = "select s from Society s join fetch s.newsImageList where s.id = :newsId")
    Optional<News> findWithImageListByNewsId(@Param("newsId") Long newsId);
}
