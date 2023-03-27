import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "@/styles/search/SearchPages.module.scss"

interface Iprops{
    popularData: Array<HTMLElement>,
    elem?: HTMLElement
}


export function PopularContent() {

    const [popularData, setPopularData] = useState()

    useEffect(() => {
        const popularContentGrid = document.querySelector<HTMLElement>('#popularContentGrid');
    
        /**
         * 특정 div만 새로고침 
         */
        window.setInterval(function divLoad(){  
            $('#popularContentGrid').load(window.location.href + "popularContentGrid");
        }, 1000);
    
        }, []);


    return (
        <div>
            <div className={styles.popularContentGrid} id="popularContent" >
                {/* {popularData.map(item =>{
                    <p className={styles.popularContent}>{item.id}. {item} </p>
                })} */}
                <p className={styles.popularContent} id='myElement'>1. 윤석열 지지율</p>
                <p className={styles.popularContent}>2. 유아인 구속수사</p>
                <p className={styles.popularContent}>3. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>4. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>5. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>6. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>7. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>8. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>9. 추천검색어 올라오는 곳</p>
                <p className={styles.popularContent}>10. 추천검색어 올라오는 곳</p>
            </div>
        </div>
    )
}