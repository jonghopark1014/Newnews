package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.dtype.Society;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SocietyRepository extends JpaRepository<Society, Long> {

    @Query(value = "select s from Society s join fetch s.newsImageList" , countQuery = "select count(s) from Society s")
    Page<Society> findAllWithCategory(Pageable pageable);

}
