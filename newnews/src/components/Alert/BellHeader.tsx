import { useState, useCallback } from "react";
import styles from "../../styles/BellHeader.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "@/components/Alert/Modal";


export function BellHeader(){
    const [isOpenModal, setOpenModal] = useState<boolean>(false);

    const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    }, [isOpenModal]);


    const navigate = useNavigate()

    function goBack() {
        navigate(-1)
    }

    return (
    <div className={styles.container} >
        <div className={styles.bellBar}>
            <IoIosArrowBack className={styles.goBack} onClick={ goBack }/>
            <div className={styles.alert}>
                <h2>알림센터</h2>
            </div>
            {isOpenModal && (
            <Modal onClickToggleModal={onClickToggleModal} >
                전체 알림 삭제
                <br />
                읽은 알림 삭제
                <br />
                전체 알림 읽음
            </Modal>
            )}
            <RiDeleteBin6Line className={styles.deleteAlret} onClick={ onClickToggleModal }/>
        </div>
    </div>
    )
}