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
    url?: string,
    title: string,
    page : boolean,
    categoryId : number | string,
    onClick?:  void,
    Img? : string
}

interface Props {
    data: Array<Card>;
};

export const ArticleCard = ( { id, title, url, page, categoryId } : Card ) => {
    const navigate = useNavigate()

    const categoryName: Record<string, number>= {
        "Economy" : 1,
        "Politics" : 2,
        "Society" : 3,
        "LifeAndCulture" : 4,
        "ItAndScience" : 5,
    }

    const [activeId, setActiveId] = useState<number>()
    const [marked, setMarked] = useState(true);
    const isLogin = useRecoilValue(LoginState)
    const userId = isLogin[0].id
    const newsId = id
    const pages = page

    const removeBookmark = useRemoveBookmark( userId, newsId )
    const AddBookmark = useAddBookmark()
    
    const onClick = (id: number) => setActiveId(id);
    
    const onClickRead = () => {
        if (typeof(categoryId) === 'string') {
            const category = categoryName[categoryId]
            navigate('/detail', { state: { newsId: newsId, categoryId: category }})
        } else {
            navigate('/detail', { state: { newsId: newsId, categoryId: categoryId }})
        }
    }
    
    const onClickRemove = useCallback(() => {
        setMarked(!marked)
        if (marked) {
            removeBookmark.mutate({userId: userId, newsId :newsId})
        } else {
            AddBookmark.mutate({userId: userId, newsId :newsId})
        }
    }, [])

    
    return(
        <div>
            <div className={styles.articleCard} >
                <div className={pages ? (styles.bookmarkArticleCard) : (styles.articleImg)} >
                    <img src={`${url}`} alt="" onClick={() => { onClickRead() }} />
                    <div className={styles.gradation}>
                        {pages ? (<h3 onClick={() => { onClickRead() }}>{title}</h3>) : (<h4 onClick={() => { onClickRead() }}>{title}</h4>) }
                        {marked ? <BsBookmarkCheckFill className={styles.arterIcons} onClick={()=>{onClickRemove()}}/> : <BsBookmarkPlus className={styles.icons} onClick={()=>setMarked(!marked)}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
