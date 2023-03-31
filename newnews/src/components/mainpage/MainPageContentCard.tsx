import "@/styles/main/MainPageStyles.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface Iprops {
    newsId: number,
    preNewsId : number,
    title: string,
    press: string,
    newsImage: string,
    newsIndex: number,
}

export function MainPageContentCard(props: Iprops){
    const navigate = useNavigate();
    const title = props.title;
    const press = props.press;
    const newsImage = props.newsImage;
    const newsIndex = props.newsIndex + 1;

    useEffect(()=>{
        const newsCardUpper = document.querySelector<HTMLElement>(`div.main-page-content-card:nth-child(${newsIndex})>.upper-half`);
        const newsCardLower = document.querySelector<HTMLElement>(`div.main-page-content-card:nth-child(${newsIndex})>.lower-half`);
        if (newsCardUpper && newsCardLower) {
            newsCardUpper.style.backgroundImage = '';
            newsCardLower.style.backgroundImage = '';
            newsCardUpper.style.backgroundImage = `linear-gradient(#00000000 70%, #000000c0 85%, #000000c0 100%), url("${newsImage}")`;
            newsCardLower.style.backgroundImage = `linear-gradient(#00000000 70%, #000000c0 85%, #000000c0 100%), url("${newsImage}")`;
        }

    }, [newsImage]);

    return (
        <div className="main-page-content-card page no-anim" onClick={()=>navigate("/detail", { state: { newsId: props.newsId, preNewsId: props.preNewsId } })}>
            <div className="upper-half">

            </div>
            <div className="lower-half">
                <h3>{title}</h3>
                <h4>{press}</h4>
            </div>
        </div>
    )
}