package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.dtype.Politics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoliticsRepository extends JpaRepository<Politics, Long> {
}
