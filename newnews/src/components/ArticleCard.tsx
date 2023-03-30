import { useEffect, useState } from 'react'
import styles from "../styles/ArticleCard.module.scss"
import bondee from "../assets/bondee.jpg"
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";


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

// export const ArticleCard = ({data}: Props) => {
export const ArticleCard = ({width, height} : Card ) => {
    const [activeId, setActiveId] = useState<number>()

    const onClick = (id: number) => setActiveId(id);
    
    useEffect(() =>{
        const articleCard = document.querySelector<HTMLElement>('#articleCard')

        if (articleCard) {
            articleCard.style.width =`${width}%`
            articleCard.style.height =`${height}px`
        }        
    }, [])
    
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

        <div  className={styles.articleCard}>
            {/* {data.map(card => (
            <div
            key={card.id}
            className={`${styles.articleImg} ${activeId === card.id ? 'active' : ''}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})` }}>
            <h3>{card.title}</h3>
            </div>))} */}
            <div id='articleCard' className={styles.articleImg}>
                <img src={bondee} />
                {/* <img src={`${url}`} alt="" /> */}
                <div className={styles.gradation}>
                    <h3>본디 신상정보 사실이 아니다본디 신상정보 사실이 아니다본디 신상정보 사실이 아니다 </h3>
                    {bookMark(marked)}
                </div>
            </div>
        </div>
        
    )
}
