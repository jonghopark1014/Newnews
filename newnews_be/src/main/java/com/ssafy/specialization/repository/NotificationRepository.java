package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    int deleteAllByUserId(Long userId);

    int deleteByUserIdAndNewsId(Long userId, Long newsId);

//    @Modifying
//    @Query("update Notification n set n.status = 'READ' where n.user.id = :userId")
//    int bulkReadByUserId(@Param("userId") Long userId);

    @Query("select n from Notification n " +
            "join fetch n.news " +
            "join fetch n.watched nw join fetch nw.news " +
            "where n.user.id = :userId")
    List<Notification> findAllByUserId(@Param("userId") Long userId);

//    @Query("select n from Notification n " +
//            "join fetch n.news nn join fetch nn.newsImageList " +
//            "join fetch n.watched nw join fetch nw.news " +
//            "where n.user.id = :userId")
//    List<Notification> findAllWithNewsByUserId(@Param("userId") Long userId);

    @Query(value = "select n from Notification n " +
            "join fetch n.news nn join fetch nn.newsImageList " +
            "join fetch n.watched nw join fetch nw.news " +
            "where n.user.id = :userId",countQuery ="select count(n) from Notification n where n.user.id = :userId")
    Page<Notification> findAllWithRelativeNewsByUserId(@Param("userId") Long userId, Pageable pageable);

    Optional<Notification> findByUserIdAndNewsId(Long userId, Long newsId);
}
