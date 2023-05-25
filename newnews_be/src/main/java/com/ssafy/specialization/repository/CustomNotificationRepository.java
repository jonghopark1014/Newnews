package com.newnews.newnews_be.repository;

import com.newnews.newnews_be.dto.NotificationListResponseDto;

import java.util.List;

public interface CustomNotificationRepository {

    List<NotificationListResponseDto> getNotificationList(Long userId);
}
