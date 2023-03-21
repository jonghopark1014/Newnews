import { Link, useNavigate } from "react-router-dom"
import { VscBell  } from "react-icons/vsc"
import { VscBellDot  } from "react-icons/vsc"
import "../styles/Header.scss"

interface icon {
    slide : void
}

export function Header(){

    const navigate = useNavigate();

    function onClickBell(e:any) {
        navigate('/bell')
    }

    return (
        <div>
            <div className="headerStyle">
                <h1 className="h1Style">logo</h1>
                <VscBell className="icons" onClick={onClickBell}/>
            </div>
        </div>
    )
}