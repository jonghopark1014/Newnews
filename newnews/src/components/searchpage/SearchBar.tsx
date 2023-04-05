import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router";
import styles from "@/styles/search/SearchBar.module.scss";

// 검색창 컴포넌트

interface Props{
    onClick(): React.MouseEvent<HTMLDivElement>,
    onChange(): React.ChangeEvent<HTMLInputElement>,
}
/**
 * 
 * @returns searchBar component
 */
export function SearchBar(){
    const navigate = useNavigate()

    const [inputs, setInputs] = useState<string>('');

    /**
     * 결과 페이지로 가는 함수
     */
    function resultPage (e: string) {
        navigate('/result', {state: { keyword : inputs}})    
    }
    /**
     * 
     * @param e input값을 실시간으로 보여주는 값
     */
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputs(e.target.value);
    };

    /**
     * enter를 치면 검색해줌
     * @param e enter 
     */
    function keywordDown (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Enter") {
            e.preventDefault();
            navigate('/result', {state: { keyword : inputs}})
        }
    }

    return (
    <div className={styles.container}>
        <div className={styles.searchbar}>
            <input className={styles.searchInput} type="search" placeholder="검색어를 입력해주세요"
            onChange={onChange} value={inputs} onKeyDown={keywordDown}/>
            <div onClick={()=> resultPage(inputs)}>
                <AiOutlineSearch className={styles.searchIcon} />
            </div>
        </div>
    </div>
    )
}
