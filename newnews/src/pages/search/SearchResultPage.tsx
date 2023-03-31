import { SearchBar } from "../../components/SearchBar";
import styles from "@/styles/search/SearchPages.module.scss"
import { ArticleCard} from "../../components/ArticleCard"

/**
 * 
 * @returns 검색 결과 페이지
 */
export function SearchResultPage(){
    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div>
                {/* <ArticleCard data={}/> */}
                <ArticleCard />
            </div>
        </section>

    )
}