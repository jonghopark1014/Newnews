import { atom } from "recoil"

export interface topicStateType {
    topics: string[],
    focused: string
}

export const topicAtom = atom<topicStateType>({
    key: "topicAtom",
    default: {
        topics: ["연관뉴스", "정치", "연애", "IT/과학", "해외축구"],
        focused: "정치",
    },
});
