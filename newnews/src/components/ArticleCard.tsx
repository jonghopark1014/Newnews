import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";

import useRemoveBookmark from "@/hooks/bookmark/useRemoveBookmark";
import useAddBookmark from "@/hooks/bookmark/useAddBookmark";
import useMainNewsDetail from "@/hooks/main/useMainNewsDetail";
import { LoginState } from '@/states/LoginState';

import styles from "@/styles/ArticleCard.module.scss"

interface Card {
    id: number,
    url: string,
    title: string,
    page : boolean,
    categoryId : number,
    onClick?:  void,
}

interface Props {
    data: Array<Card>;
};

export const ArticleCard = ( { id, title, url, page, categoryId } : Card ) => {
    const navigate = useNavigate()

    const [activeId, setActiveId] = useState<number>()
    const [marked, setMarked] = useState(true);
    const isLogin = useRecoilValue(LoginState)

    const userId = isLogin[0].id
    const newsId = id
    const cateoryId = categoryId
    const pages = page

    const removeBookmark = useRemoveBookmark( userId, newsId )
    const AddBookmark = useAddBookmark()
    
    const onClick = (id: number) => setActiveId(id);
    
    const onClickRead = () => {
        navigate('/detail', { state: { newsId: newsId, categoryId: categoryId }})
    }
    
    const onClickRemove = useCallback(() => {
        setMarked(!marked)
        if (marked) {
            removeBookmark.mutate({userId: userId, newsId :newsId})
        } else {
            AddBookmark
        }
    }, [])
        
    return(
        <div>
            <div className={styles.articleCard} >
                <div className={pages ? (styles.bookmarkArticleCard) : (styles.articleImg)} >
                    <img src={`${url}`} alt="" onClick={() => { onClickRead() }} />
                    <div className={styles.gradation}>
                        <h3 onClick={() => { onClickRead() }}>{title}</h3>
                        {marked ? <BsBookmarkCheckFill className={styles.arterIcons} onClick={()=>{onClickRemove()}}/> : <BsBookmarkPlus className={styles.icons} onClick={()=>setMarked(!marked)}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
