import { IoEarth } from "react-icons/io5";
import styles from "@/styles/bell/BellComponents.module.scss";

interface Iprops{
    children : string,
    preNewsId: number,
    newsId: number,
}

export const BellComponents = ({ children, preNewsId, newsId } : Iprops) =>{


    return (
        <div className={styles.bellGrid} onClick={() =>{}}>
            <IoEarth className={styles.icons}/>
            <h4> 지난번에 보신 <span>{children}</span> 에 대한 연관된 뉴스가 있습니다</h4>
        </div>
    )
}