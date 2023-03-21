import "@styles/MainPage.scss"

interface Iprops {
    topic: string,
    focus: boolean,
}

export function MainPageTabTopic({topic, focus}: Iprops){
    const focusedTopic = ()=>{
        if (focus){
            console.log(topic)
            return 'focus';
        } else {
            return '';
        }
    }
    return (
        <div className={"newstopic " + focusedTopic()}>
            {topic}
        </div>
    )
}