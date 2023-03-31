import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { VscBell, VscBellDot  } from "react-icons/vsc"

import { LoginState } from "@/states/LoginState";
import useBellList from "@/hooks/bell/useBellList";

import styles from "../styles/Header.module.scss"

interface Iprops {
    children?: React.ReactNode,
    data? : string[] | number[]
    userId? : number | null
}

/**
 * 
 * @param param0 상단위의 이름
 * @returns 상단 바 
 */
export function Header({children}: Iprops) {
    const navigate = useNavigate()
    

    const isLogin = useRecoilValue(LoginState)
    const AlertList = useBellList()
    const userId = isLogin[0].id
    const [data, setData] = useState<Iprops[]>([])
    /**
     * 페이지 랜더링하자마자 알람을 가져오기
    */
    useState(() => {
        AlertList.mutate({userId: 1}, {
            onSuccess: (data) => {
                setData(data.data)
            }
        })
    })

    const alertIcon = (state : boolean) =>{
        if (data.length === 0) {
            return (<VscBell className={styles.icons} onClick={() => {navigate('/bell')}}/>)
        } else {
            return (<VscBellDot className={styles.iconsAfter} onClick={() => {navigate('/bell')}}/>)
        }
    }

    return (
        <header>
            <div className={styles.headerStyle}>
                <h2 className={styles.h1Style}>{children}</h2>
                {alertIcon(true)}
            </div>
        </header>
    )
}