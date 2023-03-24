import { atom } from "recoil"

export interface topicStateType {
    topics: string[],
    focused: string
}

export const topicAtom = atom<topicStateType>({
    key: "topicAtom",
    default: {
        topics: ["연관뉴스", "경제", "IT/과학", "국내축구", "해외축구", "연예"],
        focused: "연관뉴스",
    },
});
