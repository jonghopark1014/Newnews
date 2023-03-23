package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
