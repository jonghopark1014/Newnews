import { Button } from "@components/Button"
import { BellHeader } from "@components/Alert/BellHeader";
import styles from "@styles/Bellpages.module.scss"


/**
 * 
 * @returns 알림페이지
 */
export function BellPages(){

    return (
        <section className={styles.testObj}>
            <BellHeader />
            {/* <div>
                여기에 알림뜨게 하기 없으면 빈페이지 보여주기
            </div> */}
        </section>
    )
}