package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long>, CustomNewsRepository {

}
