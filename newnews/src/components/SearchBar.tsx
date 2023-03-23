import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router";
import styles from "../styles/SearchBar.module.scss";

// 검색창 컴포넌트

interface icons{
    onClick(): React.MouseEvent<HTMLDivElement>,
    onChange(): React.ChangeEvent<HTMLInputElement>,
}

export function SearchBar(){

    const [inputs, setInputs] = useState('');
    const navigate = useNavigate()

    /**
     * 결과 페이지로 가는 함수
     */
    function resultPage (e: string) {
        console.log('dddd', e)
        navigate('/result')
    }
    /**
     * 
     * @param e input값을 실시간으로 보여주는 값
     */
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputs(e.target.value);
    console.log(e.target.value)
    };

    return (
    <div className={styles.container}>
        <div className={styles.searchbar}>
            <input className={styles.searchInput} type="search" placeholder="검색어를 입력해주세요"
            onChange={onChange} value={inputs}/>
            <div onClick={()=> resultPage(inputs)}>
            <AiOutlineSearch className={styles.searchIcon} />
            </div>
        </div>
    </div>
    )
}