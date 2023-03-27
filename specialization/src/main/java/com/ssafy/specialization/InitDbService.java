package com.ssafy.specialization;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class InitDbService {

    private final InitDb initDb;

    @PostConstruct
    public void test(){
        initDb.init();
    }

}
