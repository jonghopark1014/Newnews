package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.entity.Watched;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchedRepository extends JpaRepository<Watched, Long>, CustomWatchedRepository {

}
