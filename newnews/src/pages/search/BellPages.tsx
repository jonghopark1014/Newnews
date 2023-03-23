import { Button } from "../../components/Button"
import styles from "../../styles/BellPages.module.scss"
import { BellHeader } from "../../components/alert/BellHeader";


/**
 * 
 * @returns 알림페이지
 */
export function BellPages(){

    return (
        <section>
            <BellHeader />
            {/* <div>
                여기에 알림뜨게 하기 없으면 빈페이지 보여주기
            </div> */}
        </section>
    )
}