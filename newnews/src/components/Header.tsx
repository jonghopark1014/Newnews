import { Link, useNavigate } from "react-router-dom"
import { VscBell, VscBellDot  } from "react-icons/vsc"
import styles from "../styles/Header.module.scss"

interface Icons {
    value : React.ReactNode,
    slide : void
    childern?: React.ReactNode
}

export function Header(value: Icons){

    const navigate = useNavigate();
    const funcName = ({Icons}: any) => { return (<div> <Icons /> </div>) }

    return (
        <div>
            <div className={styles.headerStyle}>
                <h2 className={styles.h1Style}>logo</h2>
                <h2 className={styles.h1Style}>{value}</h2>
                <VscBell className={styles.icons} onClick={() => {navigate('/bell')}}/>
            </div>
            {/* 알림이 뜨면 이미지가 변환해야됨 */}
        </div>
    )
}