import { useNavigate } from "react-router";
import { Button } from "@/components/Button";
import styles from "@/styles/bell/Bellpages.module.scss"
import { BellHeader } from "@/components/bell/BellHeader";


interface Iporps{
    onClick(): React.MouseEvent<HTMLDivElement>,
}

/**
 * 
 * @returns 스크랩 결과가 없을때 페이지
 */
export function BellNonePage() {
    const navigate = useNavigate()
    
    return (
        <section className={styles.testObj}>
            <BellHeader />
            <div className={styles.center}>
                <h3 >
                    알림이 없습니다.
                </h3>
                <br />
                <Button width={180} onClick={()=>{navigate('/')}}>
                    추천뉴스 보러가기
                </Button>
            </div>
        </section>
    )
}