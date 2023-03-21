import { MainPageTabTopic } from "./MainPageTabTopic";
import "@styles/MainPage.scss"

export function MainPageTab(){
    const topics = ["정치", "연애", "IT/과학", "해외축구"];
    const focus = "정치"
    return (
        <div className="main-page-tab">
            {topics.map((topic, index)=>{return <MainPageTabTopic topic={topic} focus={(topic === focus)} key={index}/>})}
        </div>
    )
}

