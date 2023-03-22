import React  from "react";
import styles from "../styles/Button.module.scss"

interface Props {
    children?: React.ReactNode;
    onClick: () => void;
}

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
