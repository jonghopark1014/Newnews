package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.dto.BookmarkedNewsResponseDto;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class NewsRepositoryImpl implements CustomNewsRepository{

    private final EntityManager em;

    @Override
    public List<BookmarkedNewsResponseDto> getBookmarkedNewsListWithCategory(Long userId) {

        String sql = "SELECT n.*, MIN(i.url) AS url\n" +
                "FROM bookmark b\n" +
                "         INNER JOIN news n ON b.news_id = n.news_id\n" +
                "         INNER JOIN news_image i ON n.news_id = i.news_news_id\n" +
                "WHERE b.user_id = ?\n" +
                "GROUP BY n.news_id;";

        List<BookmarkedNewsResponseDto> list = new ArrayList<>();

        List<Object[]> resultList = em.createNativeQuery(sql)
                .setParameter(1, userId)
                .getResultList();

        for (Object[] objects : resultList) {
            BigInteger bigInteger = (BigInteger) objects[1];
            Long object = bigInteger.longValue();

            BookmarkedNewsResponseDto dto = BookmarkedNewsResponseDto.builder()
                    .categoryId(getCategoryId((String) objects[0]))
                    .id(object)
                    .content((String) objects[2])
                    .newsDate((Timestamp) objects[3])
                    .press((String) objects[4])
                    .reporter((String) objects[5])
                    .title((String) objects[6])
                    .newsImage((String) objects[7])
                    .build();
            list.add(dto);
        }

        return list;
    }

    private static int getCategoryId(String str) {
        int categoryId=0;

        switch (str) {
            case "Economy":
                categoryId = 1;
                break;
            case "Politics":
                categoryId = 2;
                break;
            case "Society":
                categoryId = 3;
                break;
            case "LifeAndCulture":
                categoryId = 4;
                break;
            case "ItAndScience":
                categoryId = 5;
                break;
        }
        return categoryId;
    }
}
