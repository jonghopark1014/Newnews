import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom"

export function Footer(){
    return (
        <div className="footer">
            <Link to="/" className="footer-navigator"><GrHomeRounded/></Link>
            <Link to="/search" className="footer-navigator"><AiOutlineSearch/></Link>
            <Link to="/bookmark" className="footer-navigator"><FiBookmark/></Link>
            <Link to="mypage" className="footer-navigator"><HiUserCircle/></Link>
        </div>
    )
}