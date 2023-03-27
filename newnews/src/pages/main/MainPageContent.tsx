import { useEffect, useState } from 'react';
import '@styles/MainPageStyles.scss';
import { MainPageContentCard } from "@components/mainpage/MainPageContentCard";

interface newsMain {
    newsId : number,
    title : string,
    press : string,
    newsImage : string,
};

const dummy: newsMain[] = [{
    newsId : 1,
    title : "1번",
    press : "일번일보",
    newsImage : "https://w7.pngwing.com/pngs/218/24/png-transparent-white-and-green-number-1-number-number-1-blue-image-file-formats-text-thumbnail.png",
},{
    newsId : 2,
    title : "2번",
    press : "2번일보",
    newsImage : "https://w7.pngwing.com/pngs/33/502/png-transparent-number-2-image-file-formats-text-logo-thumbnail.png",
},{
    newsId : 3,
    title : "3번",
    press : "3번일보",
    newsImage : "https://w7.pngwing.com/pngs/35/303/png-transparent-number-3-text-trademark-logo-thumbnail.png",
}];

export function MainPageContent(){
    const [news, setNews] = useState(dummy);
    // const [news, setNews] = useState(dummy);
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

    useEffect(()=>{
        const newsElems = document.querySelectorAll<HTMLElement>('.main-page-content-card');
        const mainpage = document.querySelector('.main-page-content');
        
        for (let i = 0; i < newsElems.length; i++) {
            newsElems[i].id = String(i);
            io.observe(newsElems[i]);
        }

        if (mainpage) {
            mainpage.addEventListener('scroll', (e)=>{
                console.log(ioIndex);
            })
        }
    }, [])

    return (
        <div className="main-page-content">
            {news.map((news, index)=>{return <MainPageContentCard newsId={news.newsId} title={news.title} press={news.press} newsImage={news.newsImage} newsIndex={index} key={index}/>})}
        </div>
    )
}