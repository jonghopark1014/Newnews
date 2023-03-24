import React  from "react";
import styles from "../styles/Button.module.scss"

interface Props {
    children?: React.ReactNode;
    onClick: () => void;
}


/**
 * 
 * @param param0 버튼 안에 이름
 * @returns button component
 */
export const Button: React.FC<Props> = ({ 
    children,
    onClick, 
}) => { 
    
return (
    <button 
    onClick={onClick} className={styles.buttonStyle}
    >
    {children}
    </button>
);
}
