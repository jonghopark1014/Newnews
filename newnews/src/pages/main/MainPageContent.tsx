import { MainPageContentCard } from "@components/mainpage/MainPageContentCard";

const dummy:{
    newsId : number,
    title : string,
    press : string,
    newsImage : string,
}[] = [{
    newsId : 2342346,
    title : "1번",
    press : "일번일보",
    newsImage : "https://w7.pngwing.com/pngs/218/24/png-transparent-white-and-green-number-1-number-number-1-blue-image-file-formats-text-thumbnail.png",
},{
    newsId : 23462346,
    title : "2번",
    press : "2번일보",
    newsImage : "https://w7.pngwing.com/pngs/33/502/png-transparent-number-2-image-file-formats-text-logo-thumbnail.png",
},{
    newsId : 23462346,
    title : "3번",
    press : "3번일보",
    newsImage : "https://w7.pngwing.com/pngs/35/303/png-transparent-number-3-text-trademark-logo-thumbnail.png",
}];

export function MainPageContent(){


    return (
        <div className="main-page-content">
            {dummy.map((news, index)=>{return <MainPageContentCard newsId={news.newsId} title={news.title} press={news.press} newsImage={news.newsImage} newsIndex={index} key={index}/>})}
        </div>
    )
}