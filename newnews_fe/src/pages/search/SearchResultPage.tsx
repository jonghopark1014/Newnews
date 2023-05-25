import { useEffect, useState, useRef  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/states/LoginState";
// import { motion, useScroll } from "framer-motion"

import { SearchBar } from "@/components/searchpage/SearchBar";
import { ArticleCard} from "@/components/ArticleCard"
import useSearchKeyword from "@/hooks/search/useSearchKeyword";
import useSearchSave from "@/hooks/search/useSearchSave";

import styles from "@/styles/search/SearchPages.module.scss"

interface Iporps{
    img: string,
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
    // 로딩
    const [loading, setLoading] = useState(false)

    const isLogin = useRecoilValue(LoginState);
    
    // 로그인되어있는지 확인
    const isLogBoolean = isLogin[0].isLogin
    // 아이디 
    const userId = isLogin[0].id
    const username = isLogin[0].username

    const searchSave =  useSearchSave()
    
    // const username = isLogin[0].username
    // const keyword = location.state.keyword
    // const searchSave =  useSearchSave(keyword, username)
    
    useEffect(()=> {
        searchSave.mutate({keyword: keyword, username: username})
        if (searchKeyword.isLoading) {
            setData(undefined)
            setLoading(true)
        }
        if (searchKeyword.isSuccess) {
            setData(searchKeyword.data)
            setLoading(false)
            if (searchKeyword.data.length === 0) {
                navigate('/search/error')
            }
        }
    }, [keyword, searchKeyword.data])
    
    return (
        <section className={styles.searchSection}>
            {/* <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: scrollRef }}/> */}
            <SearchBar/>
            {newsData && newsData.map((item, index) =>
                <div className={styles.step} key={index}>
                    <div>
                        <div className={styles.circle}><i className={styles.fa}></i></div>
                    </div>
                    <div>
                        <ArticleCard  title={item.title} id={item.news_id} categoryId={item.dtype} Img={item.img} page={false} />
                    </div>
                </div>
            )}
            {loading && 
                <div className={styles.loading}>
                    <div className={styles.example}>
                        <div className={styles.block}>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                        </div>
                    </div>
                    <h3 className={styles.description}>
                        "{keyword}" 검색중입니다
                    </h3>
                </div>
            }
        </section>
    )
}