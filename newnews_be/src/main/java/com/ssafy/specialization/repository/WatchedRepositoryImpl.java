package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.dto.WatchedResponseDto;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
public class WatchedRepositoryImpl implements CustomWatchedRepository{
    private final EntityManager em;

    @Override
    public WatchedResponseDto countWatchedCategory(Long userId) {
        String sql = "select n.dtype, count(n.dtype) from watched w left join news n on n.news_id = w.news_id where w.user_id=? group by n.dtype";

        List<Object[]> resultList = em.createNativeQuery(sql).setParameter(1,userId).getResultList();
        WatchedResponseDto watchedResponseDto = new WatchedResponseDto();

        for (Object[] objects : resultList) {
            String type = (String) objects[0];
            BigInteger temp = (BigInteger) objects[1];
            Long count = temp.longValue();

            switch (type) {
                case "Economy":
                    watchedResponseDto.setEconomyNews(count);
                    break;
                case "Politics":
                    watchedResponseDto.setPoliticsNews(count);
                    break;
                case "Society":
                    watchedResponseDto.setSocietyNews(count);
                    break;
                case "LifeAndCulture":
                    watchedResponseDto.setLifeAndCultureNews(count);
                    break;
                case "ItAndScience":
                    watchedResponseDto.setItAndScienceNews(count);
                    break;
            }
        }

        return watchedResponseDto;
    }
}
