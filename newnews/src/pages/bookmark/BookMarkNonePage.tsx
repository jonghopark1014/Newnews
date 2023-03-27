import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import styles from "@styles/bookmark/BookMark.module.scss"

interface icons{
    onClick(): React.MouseEvent<HTMLDivElement>,
}
/**
 * 
 * @returns 스크랩 결과가 없을때 페이지
 */
export function BookMarkNonePage() {
    const navigate = useNavigate()
    
    return (
        <section className={styles.searchSection}>
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