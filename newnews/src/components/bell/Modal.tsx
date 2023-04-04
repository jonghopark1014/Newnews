import React, { PropsWithChildren } from "react";
import { Button }  from "../Button";
import styles from "../../styles/Modal.module.scss"


interface Iprops {
    children : string
    onClickToggleModal: () => void,
    onClickChoice: () => void,
}



/**
 * 
 * @children  모달안에 들어갈 이름
 * @returns 모달창을 보여준다
 */

export default function Modal({ onClickToggleModal, onClickChoice, children}: Iprops) {
    return (
        <section className={styles.Modalsection} >
            <div className={styles.container}>
                <div className={styles.divGrid}>
                    <p>{ children }</p>
                    <div className={styles.buttonGrid}> 
                        <Button onClick={() =>{ onClickChoice() }} width={100} children={'예'} />
                        <Button onClick={() =>{ onClickToggleModal() }} width={100} children={"아니요"} />
                    </div>
                </div>
            </div>
        </section>
);
}
