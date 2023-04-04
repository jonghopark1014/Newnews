import { useNavigate } from "react-router";
import { Button } from "@/components/Button";
import styles from "@/styles/bookmark/BookMark.module.scss"

interface Iporps{
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
                    스크랩 된 기사가 없습니다.
                    <br />
                    스크랩하고 싶은 뉴스를 저장해주세요.
                </h3>
                <br />
                <Button width={180} onClick={()=>{navigate('/')}}>
                    추천뉴스 보러가기
                </Button>
            </div>
        </section>
    )
}