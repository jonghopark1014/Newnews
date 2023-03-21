import "../styles/BellHeader.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function BellHeader(){

    const navigate = useNavigate()

    function goBack(){
        navigate(-1)
    }

    return (
    <div className="container">
        <div className="BellBar">
            <IoIosArrowBack className="goBack" onClick={goBack}/>
            <div className="alert">
                <h1 >알림센터</h1>
            </div>
        </div>
    </div>
    )
}