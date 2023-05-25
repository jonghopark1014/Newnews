package com.newnews.newnews_be.dto;

import lombok.Getter;

@Getter
public class RecommendedWordListDto {
    private int rank;
    private String keyword;

    public RecommendedWordListDto(int rank, String keyword) {
        this.rank = rank;
        this.keyword = keyword;
    }
}
