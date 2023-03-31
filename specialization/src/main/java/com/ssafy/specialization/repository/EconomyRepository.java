package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.dtype.Economy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EconomyRepository extends JpaRepository<Economy, Long> {

    @Query(value = "select e from Economy e join fetch e.newsImageList",countQuery = "select count(e) from Economy e")
    Page<Economy> findAllWithCategory(Pageable pageable);

}
