import { atom } from "recoil"

export const topicAtom = atom({
    key: "topicAtom",
    default: {
        topics: ["정치", "연애", "IT/과학", "해외축구"],
        focus: "정치",
    },
});