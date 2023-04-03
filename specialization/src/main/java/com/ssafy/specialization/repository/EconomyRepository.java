package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.dtype.Economy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EconomyRepository extends JpaRepository<Economy, Long> {

    @Query(value = "select e from Economy e join fetch e.newsImageList",countQuery = "select count(e) from Economy e")
    Page<News> findAllWithCategory(Pageable pageable);

    @Query(value = "select e from Economy e join fetch e.newsImageList where e.id = :newsId")
    Optional<News> findWithImageListByNewsId(@Param("newsId") Long newsId);
}
