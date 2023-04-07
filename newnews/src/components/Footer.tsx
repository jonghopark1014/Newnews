import { useState, useEffect } from "react"
import { Link, Location } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { LoginState } from "@/states/LoginState";

import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";

import useBookmarkList from "@/hooks/bookmark/useBookmarkList";
import "@/styles/FooterBar.scss"

type navigation = '' | 'search' | 'bookmark' | 'mypage' | 'bookmark/none';
type footerState = 'icons' | 'icons-now';

export function Footer(){
    const pageState = location.pathname.slice(1)
    const isLogin = useRecoilValue(LoginState)
    const userId = isLogin[0].id
    const [bookmark, setBookmark] = useState([])

    const bookmarkList = useBookmarkList()
    
    useEffect(()=>{
        bookmarkList.mutate({userId : userId},{
            onSuccess : (data) =>{
                setBookmark(data.data) }
        })
    }, [])

    const setStyle = (state: navigation)=>{
        if (state === pageState) {
            return 'footer-icons-now';
        } else {
            return 'footer-icons';
        }
    };
    
    return (
        <footer className="footer">
            <Link to="/" id="home" className={"footer-navigator " + setStyle('')} ><GrHomeRounded viewBox="0 0 28 26"/></Link>
            <Link to="/search" id="search" className={"footer-navigator " + setStyle('search')} ><AiOutlineSearch /></Link>
            {bookmark.length > 0 ? (<Link to="/bookmark" id="bookmark" className={"footer-navigator " + setStyle('bookmark')} ><FiBookmark /></Link>): <Link to="/bookmark/none" id="bookmark" className={"footer-navigator " + setStyle('bookmark/none')} ><FiBookmark /></Link> }
            <Link to="mypage" id="mypage" className={"footer-navigator " + setStyle('mypage')} ><HiUserCircle /></Link>
        </footer>
    )
}