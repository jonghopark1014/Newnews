
import styles from "@/styles/main/MainDetailPage.module.scss";
import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

interface Iprops {

}

export function MainDetailPageModal({}: Iprops){
    const newsTile = "메타버스 소셜 앱 '본디(bondee)' 인기... 뜨는 이유는??";
    const [modal, setModal] = useState<boolean>(true);
    const modalWindow = ()=>{
        if (modal) {
            return (
                <div className={styles.modalOn}>
                    <div>
                        <p>{newsTile}</p>
                    </div>
                    <div>
                        <h5>{`님이 보신 위 뉴스에 대한 관련뉴스에요`}</h5>
                    </div>
                    <BsFillArrowRightCircleFill onClick={()=>setModal(!modal)}/>
                </div>
            )
        } else {
            return (
                <div className={styles.modalOff}>
                    <BsFillArrowLeftCircleFill onClick={()=>setModal(!modal)}/>
                </div>
            )
        }
    }

    return modalWindow();
    
}