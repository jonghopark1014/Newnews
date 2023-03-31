import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { LoginState } from "@/states/LoginState";
import { BellHeader } from "@/components/bell/BellHeader";
import { BellComponents } from "@/components/bell/BellComponents";
import useAlertList from "@/hooks/bell/useBellList";

import styles from "@/styles/bell/Bellpages.module.scss"


interface Iprops{
    data : string[] | number[]
    userId : number | null
    preNewsTitle : string
    newsId : number,
	preNewsId : number,
}

/**
 * 
 * @returns 알림페이지
 */
export function BellPages(){
    const AlertList = useAlertList()
    const isLogin = useRecoilValue(LoginState)
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

    console.log(data)

    return (
        <section className={styles.testObj}>
            <BellHeader />
            <div>
                {data.map((item, index) =>{
                    return (<BellComponents key={ index } children={item.preNewsTitle} preNewsId={item.preNewsId} newsId={item.newsId}/> )}) }
            </div>
            
        </section>
    )
}
// newsId={item.newsId} preNewsId={item.preNewsId} preNewsTitle={item.preNewsTitle}