import { topicStateType } from "../../stores/NewsTopics"
import "@styles/MainPageStyle.scss"

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
        <h3 id="MainPageTabTopic" data-focus={focus} className={"newstopic " + focusedTopic()} onClick={()=>{setState(topic);}}>
            {topic}
        </h3>
    )
}