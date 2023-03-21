import { MainPageTabTopic } from "./MainPageTabTopic";
import "@styles/MainPage.scss"
import { useRecoilState } from "recoil"
import { topicAtom, topicStateType } from "../../stores/NewsTopics"

export function MainPageTab(){
    const [topicState, setTopicState] = useRecoilState<topicStateType>(topicAtom);

    const setState = (f: string)=>{
        const state = {...topicState};
        state.focused = f;
        setTopicState(state);
    }

    return (
        <div className="main-page-tab">
            {topicState.topics.map((topic, index)=>{return <MainPageTabTopic topic={topic} focus={(topic === topicState.focused)} setState={(f)=>setState(f)} key={index}/>})}
        </div>
    )
}

