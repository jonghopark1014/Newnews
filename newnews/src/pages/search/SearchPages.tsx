import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import { LoginState } from '@/states/LoginState';
import { SearchBar } from "@/components/searchpage/SearchBar";
import { PopularContent } from "@/components/searchpage/PopularContent";

import styles from "@/styles/search/SearchPages.module.scss"

/**
 * 
 * @returns 검색페이지 보여주기
*/
export function SearchPages(){

    const isLogin = useRecoilValue(LoginState)

    const userId = isLogin[0].id


    useEffect(() =>{

    }, [])

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