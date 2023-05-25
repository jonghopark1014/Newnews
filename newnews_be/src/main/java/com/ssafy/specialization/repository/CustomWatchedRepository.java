package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.dto.WatchedResponseDto;

public interface CustomWatchedRepository {
    WatchedResponseDto countWatchedCategory(Long userId);
}
