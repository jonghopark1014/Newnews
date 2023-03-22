import { Link, useNavigate } from "react-router-dom"
import { VscBell, VscBellDot  } from "react-icons/vsc"
import styles from "../styles/Header.module.scss"

interface icon {
    slide : void
}

export function Header(){

    const navigate = useNavigate();

    function onClickBell(e:any) {
        
        navigate('/bell')
    }
    
    return (
        <div>
            <div className={styles.headerStyle}>
                <h1 className={styles.h1Style}>logo</h1>
                <VscBell className={styles.icons} onClick={onClickBell}/>
            </div>
            {/* 알림이 뜨면 이미지가 변환해야됨 */}
        </div>
    )
}