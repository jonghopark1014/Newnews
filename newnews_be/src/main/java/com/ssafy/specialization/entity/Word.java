package com.newnews.newnews_be.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Word {
    @Column(name = "searchKeyword_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String keyword;
    private Long hit;
    @OneToMany(mappedBy = "word")
    private Set<SearchHistory> searchHistoryList = new HashSet<>();

    public void setHit(Long hit) {
        this.hit = hit;
    }

    public Word(String keyword, Long hit) {
        this.keyword = keyword;
        this.hit = hit;
    }
}
