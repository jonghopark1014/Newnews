import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "@/styles/main/MainDetailPage.module.scss";
import { BsBookmarkPlus, BsBookmarkCheckFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import useMainNewsDetail from "@/hooks/main/useMainNewsDetail";
import useAddBookmark from "@/hooks/bookmark/useAddBookmark";
import useRemoveBookmark from "@/hooks/bookmark/useRemoveBookmark";

interface newsDetail {
    id : number,
	category : string | null,
	title : string,
	content : string,
	newsDate : string,
	reporter : string | null,
	press : string,
	newsImageList : [{
        url: string
    }]
};

export function MainDetailPage() {
    const location = useLocation();
    const newsId = location.state.newsId;
    const preNewsId = location.state.preNewsId;
    const useMainDetail = useMainNewsDetail(newsId);
    const usePreNews = useMainNewsDetail(preNewsId);
    const addBookmark = useAddBookmark();
    const removeBookmark = useRemoveBookmark();
    const [marked, setMarked] = useState(true);
    const [newsDetail, setNewsDetail] = useState<newsDetail>({
        id : 0,
        category : "로딩중",
        title : "로딩중",
        content : "로딩중",
        newsDate : "로딩중",
        reporter : "로딩중",
        press : "로딩중",
        newsImageList : [{
            url: "string"
        }]
    });
    const [preNews, setPreNews] = useState<newsDetail>({
        id : 0,
        category : "로딩중",
        title : "로딩중",
        content : "로딩중",
        newsDate : "로딩중",
        reporter : "로딩중",
        press : "로딩중",
        newsImageList : [{
            url: "string"
        }]
    })

    const navigate = useNavigate();
    const bookMark = (state: boolean)=>{
        if (state) {
            return (
                <BsBookmarkPlus className={styles.beforeMarked} onClick={()=>{ setMarked(!marked); addBookmark.mutate({ userId: 1, newsId: newsId }); }}/>
            )
        } else {
            return (
                <BsBookmarkCheckFill className={styles.afterMarked} onClick={()=>{ setMarked(!marked); removeBookmark.mutate({ userId: 1, newsId: newsId }); }}/>
            )
        }
    }
    const [modal, setModal] = useState<boolean>(true);
    const modalWindow = ()=>{
        return (
            <div className={styles.modalwindow}>
                <div>
                    <p>{preNews.title}</p>
                </div>
                <div>
                    <h5>{`님이 보신 위 뉴스에 대한 관련뉴스에요`}</h5>
                </div>
            </div>
        )
        
    }

    useEffect(()=>{
        if (useMainDetail.isSuccess) {
            setNewsDetail(useMainDetail.data.data);
            console.log('본문', useMainDetail.data.data);
        }
        if (usePreNews.isSuccess) {
            setPreNews(usePreNews.data.data);
            console.log('모달', usePreNews.data.data);
        }
    }, [useMainDetail, usePreNews]);
    
    useEffect(()=>{
        const arrow = document.querySelector<HTMLElement>(`.${styles.direction}`);
        const modalStyle = document.querySelector<HTMLElement>(`.${styles.modalwindow}`);
        if (arrow && modalStyle) {
            if (modal) {
                arrow.style.transform = 'rotate(0deg)';
                modalStyle.style.width = 'min(60%, 600px)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
                modalStyle.style.width = '1px';
            }
        }
    }, [, modal]);
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
                <img src={newsDetail.newsImageList[0].url} alt="" />
                <p>{"이미지설명"}</p>
                <span>{newsDetail.content}</span>
            </div>
            { modalWindow() }
            <BsFillArrowRightCircleFill className={styles.direction} onClick={()=>setModal(!modal)}/>
        </div>
    )
}