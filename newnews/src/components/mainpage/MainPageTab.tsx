import { MainPageTabTopic } from "./MainPageTabTopic";
import "@/styles/MainPage.scss"
import { useRecoilState } from "recoil"
import { topicAtom, topicStateType } from "../../stores/NewsTopics"
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export function MainPageTab(){
    const [topicState, setTopicState] = useRecoilState<topicStateType>(topicAtom);
    const [topicLen, setTopicLen] = useState<number>(topicState.focused.length);
    
    const setState = (f: string)=>{
        const state = {...topicState};
        state.focused = f;
        setTopicState(state);
    }
    
    useEffect(()=>{
        if (topicState.topics.indexOf(topicState.focused) == -1) {
            setState("연관뉴스")
        }
    }, [topicState])
    
    return (
        <div className="main-page-tab">
            <div className="main-page-tab-topic">
                {topicState.topics.map((topic, index)=>{return <MainPageTabTopic topic={topic} focus={(topic === topicState.focused)} setState={(f)=>setState(f)} key={index}/>;})}
            </div>
            <Link to="/topics" className="main-page-tab-topic-plus">
                <BsPlus viewBox="-4 0 24 16"/>
            </Link>
        </div>
    )
}
