import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";
import styles from "../styles/ArticleCard.module.scss"

interface DropImgProps{
    url : string
    description : string | undefined | [],
}

interface Card {
    id?: number,
    url?: string,
    title?: string,
    width?: number,
    height?: number,
    onClick?:  void,
}

interface Props {
    data: Array<Card>;
};

export const ArticleCard = ( {id, title, url, width, height  } : Card ) => {
    const [activeId, setActiveId] = useState<number>()
    const navigate = useNavigate()

    const onClick = (id: number) => setActiveId(id);
    
    const onClickRead = () => {
        navigate('/detail', { state: { newsId: id, preNewsId: id }})
    }

    useEffect(() =>{
        const articleCard = document.querySelector<HTMLElement>('#articleCard')

        if (articleCard) {
            articleCard.style.width =`${width}%`
            articleCard.style.height =`${height}px`
        }        
    }, [ width, height ])

        const [marked, setMarked] = useState(true);
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
        <div className={styles.articleCard} onClick={() => { onClickRead() }}>
            <div id='articleCard' className={styles.articleImg}>
                <img src={`${url}`} alt="" />
                <div className={styles.gradation}>
                    <h3>{title}</h3>
                    {bookMark(marked)}
                </div>
            </div>
        </div>
    )
}
