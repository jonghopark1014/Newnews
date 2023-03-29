import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "@/styles/main/MainDetailPage.module.scss";
import { BsBookmarkPlus, BsBookmarkCheckFill, BsFillArrowRightCircleFill } from "react-icons/bs";

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
        content : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta doloremque, fugiat iusto repellat ut natus quaerat exercitationem praesentium quidem nemo voluptatum dolorem non! Vero, tempore amet id quibusdam accusantium obcaecati.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta doloremque, fugiat iusto repellat ut natus quaerat exercitationem praesentium quidem nemo voluptatum dolorem non! Vero, tempore amet id quibusdam accusantium obcaecati.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta doloremque, fugiat iusto repellat ut natus quaerat exercitationem praesentium quidem nemo voluptatum dolorem non! Vero, tempore amet id quibusdam accusantium obcaecati.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta doloremque, fugiat iusto repellat ut natus quaerat exercitationem praesentium quidem nemo voluptatum dolorem non! Vero, tempore amet id quibusdam accusantium obcaecati.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta doloremque, fugiat iusto repellat ut natus quaerat exercitationem praesentium quidem nemo voluptatum dolorem non! Vero, tempore amet id quibusdam accusantium obcaecati.",
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
    const newsTile = "메타버스 소셜 앱 '본디(bondee)' 인기... 뜨는 이유는??";
    const userName = "박진성";
    const [modal, setModal] = useState<boolean>(true);
    const modalWindow = ()=>{
        if (modal) {
            return (
                <div className={styles.modalWindow}>
                    <div>
                        <p>{newsTile}</p>
                    </div>
                    <div>
                        <h5>{`${userName}님이 보신 위 뉴스에 대한 관련뉴스에요`}</h5>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
    
    return (
        <div className={styles.detailpage}>
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
                <span>{newsDetail.content}</span>
            </div>
            { modalWindow() }
            <BsFillArrowRightCircleFill onClick={()=>setModal(!modal)}/>
        </div>
    )
}