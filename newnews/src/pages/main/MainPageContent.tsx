import { useEffect, useState } from 'react';
import '@/styles/main/MainPageStyles.scss';
import { MainPageContentCard } from "@/components/mainpage/MainPageContentCard";
import useMainNewsRelated from '@/hooks/main/useMainNewsRelated';
import { useRecoilState } from 'recoil';
import { topicAtom, topicStateType } from '@/stores/NewsTopics';

interface newsMain {
    newsId : number,
    preNewsId : number,
    title : string,
    press : string,
    newsImage : string,
    newsImageDesc? : string
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

export function MainPageContent(){
    const [news, setNews] = useState<newsMain[]>(defaultNews);
    const [topicState, setTopicState] = useRecoilState<topicStateType>(topicAtom);
    const useNewsAfter = useMainNewsRelated();

    const options = {
        root: document.querySelector('.main-page-content'),
        rootMargin: '0px',
        threshold: 0.9
    }
    let ioIndex: any;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // entry의 target으로 DOM에 접근
            const $target = entry.target;
            const newsElems = document.querySelectorAll<HTMLElement>('.main-page-content-card');
            let news;

            // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤
            if (entry.isIntersecting) {
                ioIndex = Number($target.id);
                // console.log(ioIndex);
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
    useEffect(()=>{
        if (topicState.focused == "연관뉴스") {
            useNewsAfter.mutate({ userId: 1 }, {
                onSuccess: (data) => {
                    // console.log(data.data);
                    setNews(data.data);
                }
            });
        } else {
            
        }
        const newsElems = document.querySelectorAll<HTMLElement>('.main-page-content-card');
        const mainpage = document.querySelector('.main-page-content');
        for (let i = 0; i < newsElems.length; i++) {
            newsElems[i].id = String(i);
            io.observe(newsElems[i]);
        }
        if (mainpage) {
            mainpage.addEventListener('scroll', (e)=>{
                // console.log(ioIndex);
            })
        }
    }, [])
    return (
        <div className="main-page-content">
            {news.map((news, index)=>{return <MainPageContentCard newsId={news.newsId} preNewsId={news.preNewsId} title={news.title} press={news.press} newsImage={news.newsImage} newsIndex={index} key={index}/>})}
        </div>
    )
}