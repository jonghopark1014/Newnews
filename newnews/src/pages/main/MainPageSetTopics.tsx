import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import { topicAtom } from "@/stores/NewsTopics"
import { IoIosArrowBack } from "react-icons/io"
import "@styles/mainpage.scss"
import { SetTopicButton } from "@components/mainpage/SetTopicButton";
import { useNavigate } from "react-router-dom"

export function MainPageSetTopics(){
    const [chosenTopic, setChosenTopic] = useRecoilState(topicAtom);
    const defaultTopics = ["정치", "경제", "사회", "생활/문화", "IT/과학", "세계", "국내축구", "해외축구", "연예"];
    const [topicState, setTopicState] = useState<boolean[]>([]);
    const navigate = useNavigate();

    useState(()=>{
        for (let i = 0; i < defaultTopics.length; i++) {
            if (chosenTopic.topics.indexOf(defaultTopics[i]) === -1){
                topicState[i] = false;
            } else {
                topicState[i] = true;
            }
        }
    })

    const handleClicked = (i: number)=>{
        let topics:string[] = [];
        let focused:string = chosenTopic.focused;
        let temTopics:boolean[] = [...topicState];
        
        if (temTopics[i]){
            temTopics[i] = false;
        } else {
            temTopics[i] = true;
        }
        for (let a=0; a < temTopics.length; a++){
            if (temTopics[a]){
                topics[a] = defaultTopics[a];
            }
        }

        topics = ["연관뉴스", ...topics];

        setChosenTopic({topics, focused});
        setTopicState(temTopics);
    }

    return (
        <div>
            <div className="set-topic-header">
                <IoIosArrowBack onClick={()=> navigate(-1)}/>
                <div>
                    <h3>더 많은 토픽</h3>
                </div>
            </div>
            <div className="set-topic-content">
                {defaultTopics.map((topic:string, index)=>{return <SetTopicButton topic={topic} chosen={topicState[index]} handleClicked={()=>handleClicked(index)} key={index}/>})}
            </div>
        </div>
    )
}