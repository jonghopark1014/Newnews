import styles from "../styles/BellHeader.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function BellHeader(){

    const navigate = useNavigate()

    function goBack(){
        navigate(-1)
    }

    return (
    <div className={styles.container}>
        <div className={styles.bellBar}>
            <IoIosArrowBack className={styles.goBack} onClick={goBack}/>
            <div className={styles.alert}>
                <h1 >알림센터</h1>
            </div>
        </div>
    </div>
    )
}