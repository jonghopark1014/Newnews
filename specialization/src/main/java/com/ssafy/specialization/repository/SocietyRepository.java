package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.dtype.Economy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocietyRepository extends JpaRepository<Economy, Long> {
}
