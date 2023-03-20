import { AiOutlineSearch } from "react-icons/ai"
import "../styles/SearchBar.scss";

export function SearchBar(){

    return (
        <div className="searchbar">
            <input className="searchInput" type="search" placeholder="검색어를 입력해주세요"/> 
            <AiOutlineSearch /> 
        </div>
    )
}