package com.newnews.newnews_be.service;

import com.newnews.newnews_be.dto.RecommendedWordListDto;
import com.newnews.newnews_be.entity.SearchHistory;
import com.newnews.newnews_be.entity.User;
import com.newnews.newnews_be.entity.Word;
import com.newnews.newnews_be.repository.SearchHistoryRepository;
import com.newnews.newnews_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchHistoryService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    public Long searchKeyword(String keyword, String username){
        Word word = searchHistoryRepository.findWithSearchHistoryByKeyword(keyword).orElse(new Word(keyword, 0L));
        User user = userRepository.findWithSearchHistoryByUsername(username).orElseThrow(() ->
                new IllegalArgumentException("해당 유저는 존재하지 않습니다."));
        word.setHit(word.getHit()+1);
        SearchHistory searchHistory = SearchHistory.createSearchHistory(user, word);

        return searchHistoryRepository.save(searchHistory).getId();
    }

    public List<RecommendedWordListDto> getWordList(){
        List<String> wordOrderByHit = searchHistoryRepository.findWordOrderByHit();

        List<RecommendedWordListDto> list =new ArrayList<>();

        for (int i = 0; i < wordOrderByHit.size(); i++) {
            list.add(new RecommendedWordListDto(i+1, wordOrderByHit.get(i)));
        }

        return list;
    }

}
