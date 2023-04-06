package com.ssafy.specialization.repository;

import com.ssafy.specialization.dto.NotificationListResponseDto;

import java.util.List;

public interface CustomNotificationRepository {

    List<NotificationListResponseDto> getNotificationList(Long userId);
}
