import { useNavigate } from "react-router-dom"
import { VscBell, VscBellDot  } from "react-icons/vsc"
import styles from "../styles/Header.module.scss"

interface Iprops {
    children?: React.ReactNode,
}

/**
 * 
 * @param param0 상단위의 이름
 * @returns 상단 바 
 */
export function Header({children}: Iprops) {

    const navigate = useNavigate();

    return (
        <header>
            <div className={styles.headerStyle}>
                <h2 className={styles.h1Style}>{children}</h2>
                <VscBell className={styles.icons} onClick={() => {navigate('/bell')}}/>
            </div>
            {/* 알림이 뜨면 이미지가 변환해야됨 */}
        </header>
    )
}