import React  from "react";
import "../styles/Button.scss"

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
    onClick={onClick} className="buttonStyle"
    >
    {children}
    </button>
);
}
