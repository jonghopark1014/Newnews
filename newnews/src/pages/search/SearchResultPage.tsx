import { SearchBar } from "../../components/SearchBar";
import styles from "../../styles/SearchPages.module.scss"
import { ArticleCard} from "../../components/ArticleCard"
export function SearchPages(){
    
    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div>
                {/* <ArticleCard data={}/> */}
            </div>
        </section>

    )
}