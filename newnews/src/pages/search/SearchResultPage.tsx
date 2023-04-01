import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/states/LoginState";

import { SearchBar } from "@/components/SearchBar";
import { ArticleCard} from "@/components/ArticleCard"

import styles from "@/styles/search/SearchPages.module.scss"

interface DropImgProps{
    url : string, 
    description : string,
}

interface Iporps{
    id: number ,
    newsImageList: Array<DropImgProps>,
    title: string,
    width: number,
    height: number,
}

/**
 * 
 * @returns 검색 결과 페이지
 */
export function SearchResultPage(){
    
    const [newsData, setData] = useState<Iporps[]>()

    const isLogin = useRecoilValue(LoginState);
    // 로그인되어있는지 확인
    const isLogBoolean = isLogin[0]?.isLogin
    // 아이디 
    const isLog = isLogin[0].id
    // bookmark hook
    // const searchList = useBookmarkList()
    

    // useEffect(()=> {
    //     searchList.mutate({ userId: isLog }, {
    //         onSuccess : (data) => {
    //             setData(data.data)
    //         }
    //     })
    // }, [])

    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div>
                {newsData && newsData.map((item, index) =>
                <ArticleCard key={index} title={item.title} id={item.id} url={item.newsImageList[0].url} width={100} height={200} />
                )}
            </div>
        </section>

    )
}