import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "@styles/MainDetailPage.module.scss";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";

interface Iprops {
    newsId: number,
};

interface newsDetail {
    id : number,
	category : string,
	title : string,
	content : string,
	newsDate : string,
	reporter : string,
	press : string,
	newsImages : {
        url: string
    }[]
};

export function MainDetailPage() {
    const location = useLocation();
    const newsId = location.state.newsId;
    console.log(newsId);
    const newsDetail: newsDetail = {
        id : 1,
        category : "category",
        title : "title",
        content : "content",
        newsDate : "newsDate",
        reporter : "sreportertring",
        press : "press",
        newsImages : [{
            url: "string"
        }]
    };
    const navigate = useNavigate();
    const [marked, setMarked] = useState(true);
    const bookMark = (state: boolean)=>{
        if (state) {
            return (
                <BsBookmarkPlus className={styles.beforeMarked} onClick={()=>setMarked(!marked)}/>
            )
        } else {
            return (
                <BsBookmarkCheckFill className={styles.afterMarked} onClick={()=>setMarked(!marked)}/>
            )
        }
    }
    
    return (
        <div>
            <div className={styles.header}>
                <IoIosArrowBack onClick={()=> navigate(-1)}/>
                <div></div>
                {bookMark(marked)}
            </div>
            <div className={styles.content}>
                <h3>{newsDetail.category}</h3>
                <h2>{newsDetail.title}</h2>
                <h5>{`${newsDetail.reporter} ${newsDetail.press} 기자  |  ${newsDetail.newsDate}`}</h5>
                <img src={newsDetail.newsImages[0].url} alt="" />
                <p>{newsDetail.content}</p>
            </div>
        </div>
    )
}