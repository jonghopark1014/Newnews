import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { VscBell, VscBellDot  } from "react-icons/vsc"

import { LoginState } from "@/states/LoginState";
import useBellList from "@/hooks/bell/useBellList";

import styles from "@/styles/Header.module.scss"
import logoBlack from "@/assets/logo_black.jpg";
import logoWhite from "@/assets/logo_black.jpg";


interface Iprops {
    children?: React.ReactNode,
    data? : string[] | number[],
    userId? : number | null | undefined,
    img? : boolean,
}

/**
 * 
 * @param param0 상단위의 이름
 * @returns 상단 바 
 */
export function Header({children, img}: Iprops) {
    const navigate = useNavigate()
    
    const isLogin = useRecoilValue(LoginState)
    const bellList = useBellList()
    
    const userId = isLogin[0]?.id
    const loginBoolean = isLogin[0].isLogin
    const [data, setData] = useState<Iprops[]>([])

    /**
     * 페이지 랜더링하자마자 알람을 가져오기
    */
    useEffect(() => {
        if (loginBoolean) {
            bellList.mutate({ userId: userId }, {
                onSuccess: (data) => {
                    setData(data.data)
                }
            })
        }
    },[])    
    
    const BellIcon = (state : boolean) =>{
        if (loginBoolean) {
            if (data.length === 0) {
                return (<VscBell className={styles.icons} onClick={() => { navigate('/bell/none')}}/>)
            } else {
                return (<VscBellDot className={styles.iconsAfter} onClick={() => { navigate('/bell')}}/>)
            }
        } else {
            return (<div className={styles.none}> </div>)
        }
        
    }

    return (
        <header>
            <div className={styles.headerStyle}>
                {img && (<img src={logoBlack} alt="" className={styles.logoBlack} onClick={()=>{navigate('/')}}/> )}
                {children && <h2 className={styles.h1Style}>{children}</h2>}
                {BellIcon(true)}
            </div>
        </header>
    )
}