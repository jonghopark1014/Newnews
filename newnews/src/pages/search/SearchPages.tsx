import { SearchBar } from "../../components/SearchBar";
import styles from "@/styles/search/SearchPages.module.scss"
import { Button } from "../../components/Button";
import { ArticleCard} from "../../components/ArticleCard"
import { PopularContent } from "../../components/searchpage/PopularContent";
import { useRecoilState } from 'recoil';
import { LoginState } from '@/states/LoginState';


/**
 * 
 * @returns 검색페이지 보여주기
*/
export function SearchPages(){
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    
    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div>
                <h2 className={styles.popularSearchTerms}>
                    추천 키워드
                </h2>
                <PopularContent  />
            </div>
        </section>

    )
}