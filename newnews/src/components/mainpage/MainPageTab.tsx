import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil"

import { BsPlus } from "react-icons/bs";
import { MainPageTabTopic } from "./MainPageTabTopic";
import { topicAtom, topicStateType } from "@/stores/NewsTopics"

import "@/styles/main/MainPageStyles.scss"

export function MainPageTab(){
    const [topicState, setTopicState] = useRecoilState<topicStateType>(topicAtom);
    const [scrollX, setScrollX] = useState(0);

    const setState = (f: string)=>{
        const state = {...topicState};
        state.focused = f;
        setTopicState(state);
    }
    
    useEffect(()=>{
        const underline = document.getElementById("underline");
        const elems = document.querySelectorAll<HTMLParagraphElement>('h4#MainPageTabTopic');
        let boundingRectX;
        let boundingRectWidth;

        if (topicState.topics.indexOf(topicState.focused) == -1) {
            setState("연관뉴스")
        } 
        for (let i = 0; i < elems.length; i++){
            if (elems[i].dataset.focus === "true"){
                boundingRectX = elems[i].offsetLeft * 1;
                boundingRectWidth = elems[i].getBoundingClientRect().width * 1;
            }
        }
        if (underline && boundingRectX){
            underline.style.left = `${boundingRectX}px`;
            underline.style.width = `${boundingRectWidth}px`;
        }
    }, [topicState, scrollX])
    
    return (
        <div className="main-page-tab">
            <div className="main-page-tab-topic">
                {topicState.topics.map((topic, index)=>{return <MainPageTabTopic topic={topic} focus={(topic === topicState.focused)} setState={(f)=>setState(f)} key={index}/>;})}
                <div id="underline"></div>
            </div>
            <Link to="/topics" className="main-page-tab-topic-plus">
                <BsPlus viewBox="-4 0 24 16"/>
            </Link>
        </div>
    )
}
