import { SearchBar } from "../../components/SearchBar";
import styles from "@/styles/search/SearchPages.module.scss"
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";



interface icons{
    onClick(): React.MouseEvent<HTMLDivElement>,
}
/**
 * 
 * @returns 검색 결과가 없을때 페이지
 */
export function SearchResultErrorPage() {
    const navigate = useNavigate()
    
    return (
        <section className={styles.searchSection}>
            <SearchBar/>
            <div className={styles.center}>
                <h3 >
                    검색된 검색어와 관련된 기사가 없습니다.
                    <br />
                    다시 검색어를 입력해주세요.
                </h3>
                <Button onClick={()=>{navigate('/')}}>
                    추천뉴스 보러가기
                </Button>
            </div>
        </section>
    )
}