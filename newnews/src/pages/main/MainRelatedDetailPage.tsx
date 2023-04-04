import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { BsBookmarkPlus, BsBookmarkCheckFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import useAddBookmark from "@/hooks/bookmark/useAddBookmark";
import useRemoveBookmark from "@/hooks/bookmark/useRemoveBookmark";
import useMainNewsRelated from "@/hooks/main/useMainNewsRelated";

import styles from "@/styles/main/MainDetailPage.module.scss";

interface newsDetail {
    prenewsId: number,
    preNewsTitle: string,
    news: {
        bookmark: boolean,
        id: number,
        title: string,
        content: string,
        newsDate: string,
        reporter: string,
        press: string,
        newsImageList: {
            url: string,
            description: string
        }[]
    }
}

export function MainRelatedDetailPage() {
    const location = useLocation();
    const newsId = location.state.newsId;
    const preNewsId = location.state.preNewsId;
    const useMainRelated = useMainNewsRelated();
    const addBookmark = useAddBookmark();
    const removeBookmark = useRemoveBookmark();
    const [marked, setMarked] = useState(true);
    const [newsDetail, setNewsDetail] = useState<newsDetail>({
        prenewsId: 0,
        preNewsTitle: "로딩중",
        news: {
            bookmark: true,
            id: 0,
            title: "로딩중",
            content: "로딩중",
            newsDate: "로딩중",
            reporter: "로딩중",
            press: "로딩중",
            newsImageList: [{  
                url: "로딩중",
                description: "로딩중"
            }]
        }
    });
    

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
                    <p>{newsDetail.preNewsTitle}</p>
                </div>
                <div>
                    <h5>{`님이 보신 위 뉴스에 대한 관련뉴스에요`}</h5>
                </div>
            </div>
        )
        
    }

    useEffect(()=>{
        useMainRelated.mutate({ newsId: newsId, preNewsId: preNewsId }, {
            onSuccess: (data)=>{
                setNewsDetail(data.data);
                setMarked(newsDetail.news.bookmark);
            }
        })
    }, []);
    
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
                <h3></h3>
                <h2>{newsDetail.news.title}</h2>
                <h5>{`${newsDetail.news.reporter} ${newsDetail.news.press} 기자  |  ${newsDetail.news.newsDate}`}</h5>
                <img src={newsDetail.news.newsImageList[0].url} alt="" />
                <p>{newsDetail.news.newsImageList[0].description}</p>
                <span>{newsDetail.news.content}</span>
            </div>
            { modalWindow() }
            <BsFillArrowRightCircleFill className={styles.direction} onClick={()=>setModal(!modal)}/>
        </div>
    )
}