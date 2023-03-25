import React, { useEffect }  from "react";
import styles from "../styles/Button.module.scss"

interface Props {
    children?: React.ReactNode;
    width?: number;
    onClick: () => void;
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
}) => { 

    useEffect(() => {
        const buttonSytle = document.querySelector<HTMLElement>(`#buttonSytle`)
        
        if (buttonSytle) {
            buttonSytle.style.width=`${width}px`
        }
        console.log(width)
        console.log('dddd', buttonSytle)
    }, [])

return (
    <button id="buttonSytle"
    onClick={onClick} className={`${styles.buttonStyle}`}
    >
    {children}
    </button>
);
}
