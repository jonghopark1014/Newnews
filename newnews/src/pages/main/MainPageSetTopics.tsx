import { useRecoilState } from "recoil"
import { topicAtom } from "@/stores/NewsTopics"
import { SetTopicHeader } from "@components/mainpage/SetTopicHeader"

export function MainPageSetTopics(){
    const [topicState, setTopicState] = useRecoilState(topicAtom)

    return (
        <div>
            <SetTopicHeader />
            안녕 나는 토픽, 탐정이지
        </div>
    )
}