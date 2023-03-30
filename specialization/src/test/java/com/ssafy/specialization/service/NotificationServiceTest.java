package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.NotificationListResponseDto;
import com.ssafy.specialization.entity.Notification;
import com.ssafy.specialization.repository.NotificationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class NotificationServiceTest {

    @Autowired NotificationService notificationService;
    @Autowired NotificationRepository notificationRepository;
    @Autowired
    EntityManager em;

    @Test
    void 모든알림삭제(){
        notificationService.addNotification(1L, 1L);
        notificationService.addNotification(1L, 1L);
        notificationService.addNotification(1L, 1L);
        notificationService.deleteAll(1L);

        List<Notification> list = notificationRepository.findAllByUserId(1L);
        assertThat(list).isEmpty();
    }

    @Test
    void 알림단건삭제(){
        notificationService.addNotification(2L, 2L);
        int delete = notificationService.delete(2L, 2L);
        assertThat(delete).isEqualTo(1);
    }

//    @Test
//    void 알림_모두_읽음_처리(){
//        notificationService.addNotification(1L,2L);
//        notificationService.addNotification(1L,1L);
//        int readCount = notificationService.readAll(1L);
//
//        assertThat(readCount).isEqualTo(2);
//    }
    @Test
    void 연관뉴스리스트제공(){
        PageRequest pageRequest = PageRequest.of(0,5, Sort.by(Sort.Direction.DESC,"id"));
        List<NotificationListResponseDto> notificationList = notificationService.getNotificationList(1L);
    }
}