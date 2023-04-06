package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.NotificationListResponseDto;
import com.ssafy.specialization.entity.News;
import com.ssafy.specialization.entity.Notification;
import com.ssafy.specialization.entity.User;
import com.ssafy.specialization.entity.Watched;
import com.ssafy.specialization.repository.CustomNotificationRepository;
import com.ssafy.specialization.repository.NewsRepository;
import com.ssafy.specialization.repository.NotificationRepository;
import com.ssafy.specialization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;
    private final CustomNotificationRepository customNotificationRepository;

    //알림 추가
    @Transactional
    public Long addNotification(Long userId, Long newsId){
        checkDuplicatedNotification(userId, newsId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 비어있습니다."));

        News news = newsRepository.findById(newsId)
                .orElseThrow(() -> new IllegalArgumentException("뉴스가 비어있습니다."));

        //버그 방지용 추후 제거 예정
        Watched watched = Watched.createWatched(user, news);

        Notification notification = Notification.createNotification(user, news, watched);

        Notification savedNotification = notificationRepository.save(notification);
        return savedNotification.getId();
    }

    //알림 중복 체크
    public void checkDuplicatedNotification(Long userId, Long newsId){
        if(!notificationRepository.findByUserIdAndNewsId(userId, newsId).isEmpty()){
            throw new IllegalArgumentException("이미 알림이 등록되었습니다.");
        }
    }

    //모든 알림 삭제
    @Transactional
    public int deleteAll(Long userId){
        int deletedCount = notificationRepository.deleteAllByUserId(userId);
        if(deletedCount>0){
            return deletedCount;
        }else{
            throw new IllegalArgumentException("해당 유저의 알림이 존재하지 않습니다.");
        }
    }

    //알림 단건 삭제
    @Transactional
    public int delete(Long userId, Long newsId){
        int deletedCount = notificationRepository.deleteByUserIdAndNewsId(userId, newsId);
        if(deletedCount==1){
            return deletedCount;
        }else{
            throw new IllegalArgumentException("해당 유저의 알림이 존재하지 않습니다.");
        }
    }

    // 해당 유저의 알림 모두 읽음 처리
//    @Transactional
//    public int readAll(Long userId){
//        int readCount = notificationRepository.bulkReadByUserId(userId);
//        if(readCount>=1){
//            return readCount;
//        }else{
//            throw new IllegalArgumentException("해당 유저의 알림이 존재하지 않습니다.");
//        }
//    }

    public List<NotificationListResponseDto> getNotificationList(Long userId) {
        return customNotificationRepository.getNotificationList(userId);
    }
}
