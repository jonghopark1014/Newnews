import { AiOutlineSearch } from "react-icons/ai"


export function SearchBar(){
    return (
        <div className="search-bar">
            <AiOutlineSearch/>
            <input className="SearchInput" type="search" placeholder="검색어를 입력해주세요" />
        </div>
    )
}