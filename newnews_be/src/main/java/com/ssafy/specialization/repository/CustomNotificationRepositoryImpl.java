package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.dto.NotificationListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomNotificationRepositoryImpl implements CustomNotificationRepository {

    private final EntityManager em;

    @Override
    public List<NotificationListResponseDto> getNotificationList(Long userId) {
        String sql = "select n.dtype, noti.news_id, w.news_id as pre_news_id, nn.title " +
                "from notification noti " +
                "join news n " +
                "on noti.news_id = n.news_id " +
                "join watched w " +
                "on noti.watched_id = w.watched_id " +
                "join news nn " +
                "on nn.news_id = w.news_id " +
                "where w.user_id = ?";

        List<NotificationListResponseDto> list = new ArrayList<>();
        List<Object[]> resultList = em.createNativeQuery(sql).setParameter(1, userId).getResultList();
        for (Object[] objects : resultList) {
            String type = (String) objects[0];
            Long newsId = ((BigInteger) objects[1]).longValue();
            Long preNewsId = ((BigInteger) objects[2]).longValue();
            String preNewsTitle = (String) objects[3];
            list.add(new NotificationListResponseDto(type, newsId, preNewsId, preNewsTitle));
        }

        return list;
    }
}
