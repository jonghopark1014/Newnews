import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { LoginState } from '@/states/LoginState';
import { SearchBar } from "@/components/searchpage/SearchBar";
import { PopularContent } from "@/components/searchpage/PopularContent";

import styles from "@/styles/search/SearchPages.module.scss"

/**
 * 
 * @returns 검색페이지 보여주기
*/
export function SearchPages(){
    const location = useLocation()
    const isLogin = useRecoilValue(LoginState)

    return (
        <section className={styles.searchSection}>
            <SearchBar />
            <div>
                <h2 className={styles.popularSearchTerms}>
                    추천 키워드
                </h2>
                <PopularContent  />
            </div>
        </section>

    )
}