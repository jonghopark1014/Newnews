import { useEffect, useState, useRef  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/states/LoginState";
// import { motion, useScroll } from "framer-motion"

import { SearchBar } from "@/components/searchpage/SearchBar";
import { ArticleCard} from "@/components/ArticleCard"
import useSearchKeyword from "@/hooks/search/useSearchKeyword";

import styles from "@/styles/search/SearchPages.module.scss"

interface Iporps{
    url: string,
    title: string,
    dtype : string
    news_id : number
}

/**
 * 
 * @returns 검색 결과 페이지
 */
export function SearchResultPage(){
    const location = useLocation()
    const navigate = useNavigate()
    // const scrollRef = useRef(null)
    // const { scrollYProgress } = useScroll()
    const [newsData, setData] = useState<Iporps[]>()

    const keyword = location.state.keyword
    const searchKeyword = useSearchKeyword(keyword)

    const isLogin = useRecoilValue(LoginState);
    // 로그인되어있는지 확인
    const isLogBoolean = isLogin[0].isLogin
    // 아이디 
    const userId = isLogin[0].id
    
    useEffect(()=> {
        setData(searchKeyword.data)

        if (newsData?.length === 0) {
            navigate('/search/error')
        }
        
    }, [searchKeyword])
    return (
        <section className={styles.searchSection}>
            {/* <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: scrollRef }}/> */}
            <SearchBar/>
            {newsData && newsData.map((item, index) =>
                <div className={styles.step}>
                    <div>
                        <div className={styles.circle}><i className={styles.fa}></i></div>
                    </div>
                    <div>
                        <ArticleCard key={index} title={item.title} id={item.news_id} categoryId={item.dtype} url={item.url} page={false} />
                    </div>
                </div>
            )}
        </section>
    )
}