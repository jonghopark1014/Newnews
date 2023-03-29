package com.ssafy.specialization.repository;

import com.ssafy.specialization.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    int deleteAllByUserId(Long userId);

    int deleteByUserIdAndNewsId(Long userId, Long newsId);

    @Modifying
    @Query("update Notification n set n.status = 'READ' where n.user.id = :userId")
    int bulkReadByUserId(@Param("userId") Long userId);

    List<Notification> findAllByUserId(Long userId);

    @Query("select n from Notification n join fetch n.news nn join fetch nn.newsImageList where n.user.id = :userId")
    List<Notification> findAllWithNewsByUserId(@Param("userId") Long userId);

    Optional<Notification> findByUserIdAndNewsId(Long userId, Long newsId);
}
