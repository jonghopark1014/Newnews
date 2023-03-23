import { SearchBar } from "../../components/SearchBar";
import styles from "../../styles/SearchPages.module.scss"
import { Button } from "../../components/Button";

export function SearchResultErrorPage(){
    
    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div className={styles.center}>
                <h2 >
                    검색된 검색어와 관련된 기사가 없습니다.
                    <br />
                    다시 검색어를 입력해주세요.
                </h2>
                <Button onClick={()=>{}}>
                    추천뉴스 보러가기
                </Button>
            </div>
        </section>

    )
}