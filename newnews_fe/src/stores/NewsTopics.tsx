import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist';

// export interface topicsType{
//     id : number
//     name : string
// }

export interface topicStateType {
    topics: string[],
    focused: string
}

const { persistAtom } = recoilPersist({
    key: 'topic',
    storage: localStorage,
});

export const topicAtom = atom<topicStateType>({
    key: "topicAtom",
    default: {
        topics: ["연관뉴스", "경제", "정치", "사회", "생활/문화", "IT/과학"],
        focused: "연관뉴스"
    },
    effects_UNSTABLE: [persistAtom],
});