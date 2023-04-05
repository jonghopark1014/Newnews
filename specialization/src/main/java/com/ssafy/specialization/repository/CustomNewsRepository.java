package com.ssafy.specialization.repository;

import com.ssafy.specialization.dto.BookmarkedNewsResponseDto;

import java.util.List;

public interface CustomNewsRepository {
    List<BookmarkedNewsResponseDto> getBookmarkedNewsListWithCategory(Long userId);
}
