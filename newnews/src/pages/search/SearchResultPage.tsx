import { useEffect, useState,  } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/states/LoginState";

import { SearchBar } from "@/components/searchpage/SearchBar";
import { ArticleCard} from "@/components/ArticleCard"
import useSearchKeyword from "@/hooks/search/useSearchKeyword";

import styles from "@/styles/search/SearchPages.module.scss"


interface Iporps{
    id: number ,
    url: string
    title: string,
    categoryId : number
}

/**
 * 
 * @returns 검색 결과 페이지
 */
export function SearchResultPage(){
    
    const [newsData, setData] = useState<Iporps[]>()
    const location = useLocation()
    const keyword = location.state.keyword

    const searchKeyword = useSearchKeyword(keyword)
    
    const isLogin = useRecoilValue(LoginState);
    // 로그인되어있는지 확인
    const isLogBoolean = isLogin[0]?.isLogin
    // 아이디 
    const userId = isLogin[0].id
    // bookmark hook
    // const searchList = useBookmarkList()
    
    console.log(newsData)

    useEffect(()=> {
        setData(searchKeyword.data)
    }, [searchKeyword])

    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div>
                {newsData && newsData.map((item, index) =>
                <ArticleCard key={index} title={item.title} id={item.id} categoryId={item.categoryId} url={item.url} page={false} />
                )}
            </div>
        </section>
    )
}