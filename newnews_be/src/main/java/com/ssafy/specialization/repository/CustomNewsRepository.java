package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.dto.BookmarkedNewsResponseDto;

import java.util.List;

public interface CustomNewsRepository {
    List<BookmarkedNewsResponseDto> getBookmarkedNewsListWithCategory(Long userId);
}
