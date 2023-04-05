package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.Watched;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchedRepository extends JpaRepository<Watched, Long>, CustomWatchedRepository {

}
