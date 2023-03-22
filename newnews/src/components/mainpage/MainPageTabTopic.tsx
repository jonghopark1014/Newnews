import { topicStateType } from "../../stores/NewsTopics"
import "@/styles/MainPage.scss"

interface Iprops {
    topic: string,
    focus: boolean,
    setState: (f: string)=>void,
}

export function MainPageTabTopic({topic, focus, setState}: Iprops){

    const focusedTopic = ()=>{
        if (focus){
            return 'focus';
        } else {
            return '';
        }
    }

    return (
        <div className={"newstopic " + focusedTopic()} onClick={()=>{setState(topic);}}>
            {topic}
        </div>
    )
}