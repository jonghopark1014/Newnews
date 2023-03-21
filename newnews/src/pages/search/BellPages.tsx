import { Button } from "../../components/Button"
import "../../styles/BellPages.scss"

export function BellPages(){
    
    function onAllDelete(e:any) {
        console.log(e)
    }

    function onReadDelete(e:any) {
        console.log(e)
    }

    function onAllRead(e:any) {
        console.log(e)
    }

    return (
        <div>
            <div>
                <h1>3</h1>
            </div>
            <div className="buttonGrid">
                <Button children={"전체 알림 삭제"} onClick={() => onAllDelete(console.log("e"))}/>
                <Button children={"읽은 알림 삭제"} onClick={() => onReadDelete}/>
                <Button children={"전체 읽음 처리"} onClick={() => onAllRead}/>
            </div>
            <div className="alret">

            </div>
        </div>
    )
}