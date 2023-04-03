import { atom } from "recoil"

// export interface topicsType{
//     id : number
//     name : string
// }

export interface topicStateType {
    topics: string[],
    focused: string
}

export const topicAtom = atom<topicStateType>({
    key: "topicAtom",
    default: {
        topics: ["연관뉴스", "경제", "정치", "사회", "생활/문화", "IT/과학"],
        focused: "연관뉴스"
    },
});