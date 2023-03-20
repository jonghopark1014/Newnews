import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/FooterBar.scss"

type navigation = 'home' | 'search' | 'bookmark' | 'mypage';
type footerState = 'footer-navigator' | 'footer-navigator-now';

export function Footer(){
    const [page, setPage] = useState<navigation>('home');
    const setStyle = (state: boolean)=>{
        if (state) {
            return 'footer-navigator-now';
        } else {
            return 'footer-navigator';
        }
    }
    return (
        <div className="footer">
            <Link to="/" className="footer-navigator"><GrHomeRounded className="icons"/></Link>
            <Link to="/search" className="footer-navigator"><AiOutlineSearch className="icons"/></Link>
            <Link to="/bookmark" className="footer-navigator"><FiBookmark className="icons"/></Link>
            <Link to="mypage" className="footer-navigator"><HiUserCircle className="icons"/></Link>
        </div>
    )
}