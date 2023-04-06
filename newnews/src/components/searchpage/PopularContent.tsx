import { useEffect, useState } from "react";

import useSearchKeywordRank from "@/hooks/search/useSearchKeywordRank";

import styles from "@/styles/search/SearchPages.module.scss"

interface Iprops{
    popularData: Array<HTMLElement>,
    elem?: HTMLElement
}

interface PopularProps{
    keyword : string
    rank : number
}


export function PopularContent( ) {

    const [popularData, setPopularData] = useState<PopularProps[] | undefined>()

    const searchKeywordRank = useSearchKeywordRank()

    useEffect(() => {
        if (searchKeywordRank.isSuccess) {
            setPopularData(searchKeywordRank.data.data)
            }
    }, [searchKeywordRank]);
        
    return (
        <div>
            <div className={styles.popularContentGrid} >
                { popularData !== undefined && popularData.map((item, index) =>
                    <p className={styles.popularContent} key={index}> {item.rank}. {item.keyword} </p>
                )}
                { popularData === undefined && <p className={styles.popularContent}>추천검색어가 없습니다.</p>}
            </div>
        </div>
    )
}