package com.newnews.newnews_be.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WatchedResponseDto {

    private long economyNews;
    private long politicsNews;
    private long societyNews;
    private long lifeAndCultureNews;
    private long itAndScienceNews;

}
