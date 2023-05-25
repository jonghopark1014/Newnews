package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.entity.SearchHistory;
import com.newnews.newnews_be.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {

    @Query("select w from Word w join fetch w.searchHistoryList where w.keyword = :keyword")
    Optional<Word> findWithSearchHistoryByKeyword(@Param("keyword")String keyword);

    @Query("select w.keyword from Word w order by w.hit desc")
    List<String> findWordOrderByHit();
}
