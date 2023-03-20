import { SearchBar } from "../components/SearchBar";
import "../styles/SearchPages.scss"

export function SearchPages(){
    
    return (
        <section className="searchSection">
            <SearchBar/>
            <div>
                <h1 className="popularSearchTerms">
                    추천검색어
                </h1>
            </div>
        </section>

    )
}