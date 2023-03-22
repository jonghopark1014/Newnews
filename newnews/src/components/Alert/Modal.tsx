import React, { PropsWithChildren } from "react";
import styles from "../../styles/Modal.module.scss"


interface ModalDefaultType {
    onClickToggleModal: () => void;
    
}

function Modal({ onClickToggleModal, children,}: PropsWithChildren<ModalDefaultType>) {
    return (
        <div className={styles.container}>
            <div>{children}</div>
        <div
            onClick={(e: React.MouseEvent) => {
            e.preventDefault();

            if (onClickToggleModal) {
                onClickToggleModal();
            }
            }}
        />
        </div>
);
}

export default Modal;