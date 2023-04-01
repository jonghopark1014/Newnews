import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";
import styles from "../styles/ArticleCard.module.scss"

interface Card {
    id: number,
    url: string,
    title: string,
    page : boolean,
    onClick?:  void,
}

interface Props {
    data: Array<Card>;
};

export const ArticleCard = ( { id, title, url, page } : Card ) => {
    const [activeId, setActiveId] = useState<number>()
    const navigate = useNavigate()
    const pages = page
    const onClick = (id: number) => setActiveId(id);
    
    const onClickRead = () => {
        navigate('/detail', { state: { newsId: id, preNewsId: id }})
    }
    

        const [marked, setMarked] = useState(true);
        /**
         * 
         * @param state true/false 알아보기
         * @returns 북마크 아이콘 바꾸기
         */
        const bookMark = (state: boolean)=>{
            if (state) {
                return (
                    <BsBookmarkPlus className={styles.icons} onClick={()=>setMarked(!marked)}/>
                )
            } else {
                return (
                    <BsBookmarkCheckFill className={styles.arterIcons} onClick={()=>setMarked(!marked)}/>
                )
            }
        }
    return(
        <div>
            <div className={styles.articleCard} >
                <div className={pages ? (styles.bookmarkArticleCard) : (styles.articleImg)} >
                    <img src={`${url}`} alt="" onClick={() => { onClickRead() }} />
                    <div className={styles.gradation}>
                        <h3 onClick={() => { onClickRead() }}>{title}</h3>
                        {bookMark(marked)}
                    </div>
                </div>
            </div>
        </div>
    )
}
