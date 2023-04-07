import React, { useEffect, useState }  from "react";
import styles from "../styles/Button.module.scss"

interface Props {
    children?: React.ReactNode;
    width?: number;
    onClick: () => void;
    onKeyDown?: () => void | undefined;
}

/**
 * 
 * @param param0 버튼 안에 이름
 * @returns button component
 */
export const Button: React.FC<Props> = ({ 
    children,
    width,
    onClick,
    onKeyDown,
}) => { 

    useEffect(() => {
        const buttonSytle = document.querySelector<HTMLElement>(`#buttonSytle`)
        
        if (buttonSytle) {
            buttonSytle.style.width=`${width}px`
        }
    }, [width])

return (
    <button id="buttonSytle"
    onClick={onClick} className={`${styles.buttonStyle}`}
    >
    {children}
    </button>
);
}

