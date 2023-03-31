import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

import Modal from "@/components/Alert/Modal";
import useAlertList from "@/hooks/alert/useAlertList";
import { LoginState } from "@/states/LoginState";

import styles from "@/styles/BellHeader.module.scss";



/**
 * 
 * @returns 알림창 맨 상단 바
 */
export function BellHeader(){
    const navigate = useNavigate()
    
    const [isOpenModal, setOpenModal] = useState<boolean>(false);

    const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    }, [isOpenModal]);

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
            <Modal onClickToggleModal={onClickToggleModal} children={"알림을 전체 삭제 하시겠습니까?"} />
            )}
            <RiDeleteBin6Line className={styles.deleteAlret} onClick={ onClickToggleModal }/>
        </div>
    </div>
    )
}