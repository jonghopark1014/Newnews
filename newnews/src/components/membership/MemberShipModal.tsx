import styles from "@/styles/membership/MemberShipModal.module.scss";
import { Button } from "@/components/Button";

interface Iprops {
    children : string
    onClickToggleModal: () => void,
}

/**
 * 
 * @param children 들어갈 내용
 * @onClickToggleModal 모달 닫기
 * @returns 모달창 
 */
export default function MemberShipModal( {children, onClickToggleModal} : Iprops) {
    
    return (
        <section className={styles.modalSection}>
            <div className={styles.modalGrid}>
                <div className={styles.textGrid}>
                    <h3>{children}</h3>
                    <br />
                    <Button onClick={() => {onClickToggleModal()}} children={"확인"}></Button>
                </div>
            </div>
        </section>
    )
}