import "@styles/MainPageStyle.scss";
import { useEffect } from "react"


interface Iprops {
    newsId: number,
    title: string,
    press: string,
    newsImage: string,
    newsIndex: number
}

export function MainPageContentCard(props: Iprops){
    const title = props.title;
    const press = props.press;
    const newsImage = props.newsImage;
    const newsIndex = props.newsIndex + 1;

    useEffect(()=>{
        const newsCard = document.querySelector<HTMLElement>(`div.main-page-content-card:nth-child(${newsIndex})`);
        console.log(newsCard);
        if (newsCard) {
            newsCard.style.backgroundImage = `linear-gradient(#00000000 70%, #000000c0 85%, #000000c0 100%), url("${newsImage}")`;
        }

    }, [])

    return (
        <div className="main-page-content-card">
            <h3>{title}</h3>
            <h4>{press}</h4>
        </div>
    )
}