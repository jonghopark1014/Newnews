package com.ssafy.specialization.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchHistory {

    @Column(name = "searchHistory_id")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Word word;

    protected void setUser(User user) {
        this.user = user;
        user.getSearchHistoryList().add(this);
    }

    protected void setWord(Word word) {
        this.word = word;
        word.getSearchHistoryList().add(this);
    }

    public static SearchHistory createSearchHistory(User user, Word word){
        SearchHistory searchHistory = new SearchHistory();
        searchHistory.setUser(user);
        searchHistory.setWord(word);
        return searchHistory;
    }
}
