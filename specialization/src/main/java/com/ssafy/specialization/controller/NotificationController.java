package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.NotificationListResponseDto;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

//    @PostMapping("/read/all")
//    public ResponseEntity readAllNotification(@RequestBody Long userId){
//        notificationService.readAll(userId);
//        return Response.success(HttpStatus.OK);
//    }

    @DeleteMapping("/delete/all/{userId}")
    public ResponseEntity deleteAllNotification(@PathVariable("userId") Long userId) {
            notificationService.deleteAll(userId);
            return Response.success(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{newsId}")
    public ResponseEntity deleteNotification(@PathVariable("userId")Long userId, @PathVariable("newsId")Long newsId){
            notificationService.delete(userId, newsId);
            return Response.success(HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity getNotificationList(@RequestBody HashMap<String, Long> req) {
        List<NotificationListResponseDto> notificationList = notificationService.getNotificationList(req.get("userId"));
        return Response.success(HttpStatus.OK, notificationList);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity IllegalArgumentException(IllegalArgumentException e){
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
