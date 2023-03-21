import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import { Link, Location } from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/FooterBar.scss"

type navigation = '' | 'search' | 'bookmark' | 'mypage';
type footerState = 'icons' | 'icons-now';

export function Footer(){
    const pageState = location.pathname.slice(1)

    const setStyle = (state: navigation)=>{
        if (state === pageState) {
            return 'icons-now';
        } else {
            return 'icons';
        }
    };
    
    return (
        <div className="footer">
            <Link to="/" id="home" className={"footer-navigator " + setStyle('')}  ><GrHomeRounded /></Link>
            <Link to="/search" id="search" className={"footer-navigator " + setStyle('search')} ><AiOutlineSearch /></Link>
            <Link to="/bookmark" id="bookmark" className={"footer-navigator " + setStyle('bookmark')} ><FiBookmark /></Link>
            <Link to="mypage" id="mypage" className={"footer-navigator " + setStyle('mypage')} ><HiUserCircle /></Link>
        </div>
    )
}