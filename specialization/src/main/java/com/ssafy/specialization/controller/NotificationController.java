package com.ssafy.specialization.controller;

import com.ssafy.specialization.dto.UserHistoryRequestDto;
import com.ssafy.specialization.response.Response;
import com.ssafy.specialization.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/read/all")
    public ResponseEntity readAllNotification(@RequestBody Long userId){
        notificationService.readAll(userId);
        return Response.success(HttpStatus.OK);
    }

    @PostMapping("/delete/all")
    public ResponseEntity deleteAllNotification(@RequestBody Long userId) {
            notificationService.deleteAll(userId);
            return Response.success(HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity deleteNotification(@RequestBody UserHistoryRequestDto userHistoryRequestDto){
            notificationService.delete(userHistoryRequestDto.getUserId(), userHistoryRequestDto.getNewsId());
            return Response.success(HttpStatus.OK);
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity IllegalArgumentException(IllegalArgumentException e){
        return Response.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
