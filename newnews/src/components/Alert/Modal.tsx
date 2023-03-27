import React, { PropsWithChildren } from "react";
import { Button }  from "../Button";
import styles from "../../styles/Modal.module.scss"


interface ModalDefaultType {
    onClickToggleModal: () => void,
    children? : React.ReactNode[],
}


/**
 * 
 * @param param0 모달안에 들어갈 이름
 * @returns 모달창을 보여준다
 */
function Modal({ onClickToggleModal, children,}: PropsWithChildren<ModalDefaultType>) {
    return (
        <section className={styles.Modalsection} onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClickToggleModal) {
                onClickToggleModal();
            }
        }}>
            <div className={styles.container}>
                <div className={styles.buttonGrid}>
                    <Button onClick={() =>{}}>{children && children[0]}</Button>
                    <Button onClick={() =>{}}>{children && children[2]}</Button>
                    <Button onClick={() =>{}}>{children && children[4]}</Button>
                <div
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
                />
                </div>
            </div>
        </section>
);
}

export default Modal;
