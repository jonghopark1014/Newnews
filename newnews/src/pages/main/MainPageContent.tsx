import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { MainPageContentCard } from "@/components/mainpage/MainPageContentCard";
import useMainNewsRelated from '@/hooks/main/useMainNewsRelated';
import useMainNewsAll from '@/hooks/main/useMainNewsAll';
import { topicAtom, topicStateType } from '@/stores/NewsTopics';

import '@/styles/main/MainPageStyles.scss';

const BLUR_STATUS = {
    LEFT_BLUR: 1,
    RIGHT_BLUR: -1,
    BOTH_BLUR: 0,
}; 

interface newsMain {
    newsId : number,
    preNewsId : number,
    title : string,
    press : string,
    newsImage : string,
};

const defaultNews: newsMain[] = [
    {
        newsId : 0,
        preNewsId : 0,
        title : 'title',
        press : 'press',
        newsImage: 'url',
    },
]

// function reoder(){
//     $(".book").each(function(){
//     var pages=$(this).find(".page")
//     var pages_flipped=$(this).find(".flipped")
//     pages.each(function(i){
//         $(this).css("z-index",pages.length-i)
//     })
//     pages_flipped.each(function(i){
//         $(this).css("z-index",i+1)
//     })
//     });    
// }
function reorder() {
    const books = document.querySelectorAll<HTMLElement>('.book');
    books.forEach((book, index)=>{
        // const pages = books.children.
    })
    for (let i = 0; i < books.length; i++) {
        
    }
}

export function MainPageContent(){
    // 메인 뉴스 정보
    const [news, setNews] = useState<newsMain[]>(defaultNews);
    // topicState : {토픽설정에서 고른 토픽들, 지금 클릭한 토픽}
    const [topicState, setTopicState] = useRecoilState<topicStateType>(topicAtom);
    // 후속기사들
    const useNewsAfter = useMainNewsRelated();
    // 그외 토픽에 따른 기사들
    const useNewsAll = useMainNewsAll();
    // 현재 보고있는 뉴스의 index
    let ioIndex: any;

    
    useEffect(()=>{
        
        // intersectionObserver 옵션
        // root : viewport로 판단할 타겟
        // threshold: 관찰할 타겟이 얼마나 보일때 callback 할 지, 0~1
        const options = {
            root: document.querySelector('.main-page-content'),
            rootMargin: '0px',
            threshold: 1
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근
                const $target = entry.target;
                const newsElems = document.querySelectorAll<HTMLElement>('.main-page-content-card');
                let news;
                // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤
                if (entry.isIntersecting) {
                    ioIndex = Number($target.id);
                    console.log(ioIndex);
                    if (newsElems[ioIndex - 1]) {
                        // newsElems[ioIndex - 1].classList.add();
                    }
                    if (newsElems[ioIndex]) {
                        // newsElems[ioIndex].classList.add();
                    }
                    if (newsElems[ioIndex + 1]) {
                        // newsElems[ioIndex + 1].classList.add();
                    }
                } else {
                    // $target.classList.remove("screening");
                }
            });
        }, options);
        if (topicState.focused == "연관뉴스") {
            useNewsAfter.mutate({ userId: 1 }, {
                onSuccess: (data) => {
                    setNews(data.data.content);
                }
            });
        } else {
            useNewsAll.mutate({ category: topicState.focused }, {
                onSuccess: (data) => {
                    setNews(data.data.content);
                }
            });
        }
        const newsElems = document.querySelectorAll<HTMLElement>('.main-page-content-card');
        const mainpage = document.querySelector('.main-page-content');
        for (let i = 0; i < newsElems.length; i++) {
            newsElems[i].id = `page-${i}`;
            const upper = document.querySelector(`.main-page-content#page-${i} > .upper-half`);
            const lower = document.querySelector(`.main-page-content#page-${i} > .lower-half`);
            newsElems[i].addEventListener('click', ()=>{
                newsElems[i].classList.remove('no-anim');
                newsElems[i].classList.toggle('flipped');
                const div = document.querySelector('.page > div');
                div?.addEventListener('click',(e)=>{
                    e.stopPropagation();
                })
                reorder();
            });

            if (upper) {
                upper.id = `p${i}`;
            }
            upper?.classList.add('side-2')
            if (lower) {
                lower.id = `p${i}`;
            }
            lower?.classList.add('side-1')
            io.observe(newsElems[i]);
        }
        if (mainpage) {
            mainpage.addEventListener('scroll', (e)=>{
                // console.log(ioIndex);
            })
        }
        
        // $('.page').click(function() {
        //     $(this).removeClass('no-anim').toggleClass('flipped');
        //     $('.page > div').click(function(e) {
        //         e.stopPropagation();
        //     });
        //     reorder()   
        // });
        
        reorder()
    }, [topicState.focused])
    return (
        <div className="main-page-content">
            {news.map((news, index)=>{return <MainPageContentCard newsId={news.newsId} preNewsId={news.preNewsId} title={news.title} press={news.press} newsImage={news.newsImage} newsIndex={index} key={index}/>})}
        </div>
    )
}