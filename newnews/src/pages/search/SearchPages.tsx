import { SearchBar } from "../../components/SearchBar";
import styles from "../../styles/SearchPages.module.scss"
import { Button } from "../../components/Button";

export function SearchPages(){
    
    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div>
                <h1 className={styles.popularSearchTerms}>
                    추천검색어
                </h1>
            </div>
        </section>

    )
}