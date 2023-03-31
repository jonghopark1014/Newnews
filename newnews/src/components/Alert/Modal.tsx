import React, { PropsWithChildren } from "react";
import { Button }  from "../Button";
import styles from "../../styles/Modal.module.scss"


interface Iprops {
    children : string
    onClickToggleModal: () => void,
}



/**
 * 
 * @param param0 모달안에 들어갈 이름
 * @returns 모달창을 보여준다
 */

export default function Modal({ onClickToggleModal, children}: Iprops) {
    return (
        <section className={styles.Modalsection} >
            <div className={styles.container}>
                <div className={styles.divGrid}>
                    <p>{ children }</p>
                    <div className={styles.buttonGrid}> 
                        <Button onClick={() =>{}} children={'예'} width={60}/>
                        <Button onClick={() =>{ onClickToggleModal() }} children={"아니요"} width={60}/>
                    </div>
                </div>
            </div>
        </section>
);
}
