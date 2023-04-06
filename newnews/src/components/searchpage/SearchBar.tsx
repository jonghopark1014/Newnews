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

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.parentElement?.parentElement?.parentElement?.classList.add(styles.active);
    };
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        console.log("onBlur", e)

        if (e.target.value.length === 0) {
        e.currentTarget.parentElement?.parentElement?.parentElement?.classList.remove(styles.active);
        }
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finder = e.currentTarget.querySelector<HTMLDivElement>(".finder");
        finder?.classList.add(styles.processing);
        const input = e.currentTarget.querySelector<HTMLInputElement>(".finder__input");
        // input?.disabled = true;
        setTimeout(() => {
        finder?.classList.remove(styles.processing);
        // input?.disabled = false;
        if (input?.value.length) {
            finder?.classList.add(styles.active);
            }
        }, 1000);
        navigate('/result', { state: { keyword: inputs } });
    };

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
            <form onSubmit={onSubmit}>
            <div className={styles.finder}>
                <div className={styles.finder__outer}>
                    <div className={styles.finder__inner}>
                        <div className={styles.finder__icon} ></div>
                        <input className={styles.finder__input} onChange={onChange} value={inputs} onKeyDown={keywordDown} onFocus={onFocus}
                        onBlur={onBlur} type="text" placeholder="검색어를 입력해주세요"/>
                    </div>
                </div>
            </div>
            </form>
        </div>

    // <div className={styles.container}>
    //     <div className={styles.searchbar}>
    //         <input className={styles.searchInput} type="search" placeholder="검색어를 입력해주세요"
    //         onChange={onChange} value={inputs} onKeyDown={keywordDown}/>
    //         <div onClick={()=> resultPage(inputs)}>
    //             <AiOutlineSearch className={styles.searchIcon} />
    //         </div>
    //     </div>
    // </div>
    )
}
