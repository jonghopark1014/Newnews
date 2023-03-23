import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import styles from "../styles/SearchBar.module.scss";

// 검색창 컴포넌트

interface icons{
    text: any,
}

export function SearchBar(){
    const [text, setText] = useState('');
    const navigate = useNavigate()

    const onChange = (e : any) => {
    setText(e.target.value);
    console.log(e.target.value)
    };

    const searchClick = () => {
        navigate('/result')
    }

    return (
    <div className={styles.container}>
        <div className={styles.searchbar}>
            <input className={styles.searchInput} type="search" placeholder="검색어를 입력해주세요"
            onChange={onChange} value={text}/> 
            <AiOutlineSearch className={styles.searchIcon} onClick={searchClick}/>
        </div>
    </div>
    )
}