package com.ssafy.specialization.repository;

import com.ssafy.specialization.dto.WatchedResponseDto;

public interface CustomWatchedRepository {
    WatchedResponseDto countWatchedCategory(Long userId);
}
