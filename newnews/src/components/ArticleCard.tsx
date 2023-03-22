import React from "react";
import styles from "../styles/ArticleCard.module.scss"
import bondee from "../assets/bondee.jpg"
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";

interface Card {
    id: number;
    url: string;
    title: string;
};

interface Props {
data: Array<Card>;
};

export const ArticleCard = ({data}: Props) => {
    const [activeId, setActiveId] = React.useState<number>(1)

    const onClick = (id: number) => setActiveId(id);

    return(

        <div className={styles.articleCard}>
            {/* {data.map(card => (
            <div
            key={card.id}
            className={`${styles.articleImg} ${activeId === card.id ? 'active' : ''}`}
            onClick={() => onClick(card.id)}
            style={{ backgroundImage: `url(${card.url})` }}>
            <h2>{card.title}</h2>
            </div>))} */}
            <div className={styles.articleImg}>
                <img src={bondee} />
                {/* <img src={`${url}`} alt="" /> */}
                <div className={styles.gradation}>
                    <h2>본디 신상정보 사실이 아니다 </h2>
                    <BsBookmarkPlus className={styles.icons}/>
                    {/* <BsBookmarkDashFill className={styles.icons}/> */}
                    {/* <div className={styles.icons}> </div> */}
                </div>
            </div>
        </div>
        
    )
}
