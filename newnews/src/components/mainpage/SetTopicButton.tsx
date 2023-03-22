import "@styles/mainpage.scss"


interface Iprops {
    topic: string,
    chosen: boolean,
    handleClicked: ()=>void;
}

export function SetTopicButton({topic, chosen, handleClicked}: Iprops) {
    const highlight = ()=>{
        if (chosen){
            return "chosen";
        } else {
            return "";
        }
    }

    return (
        <div className={highlight()} onClick={()=>handleClicked()}>
            <h3>{topic}</h3>
        </div>
    )
}