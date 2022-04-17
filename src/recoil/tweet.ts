
import { atom } from "recoil";


export const tweetState = atom({
    key: "tweetState",
    default: {
        isCreating: false,
    },
})
