import { atom } from "recoil";

export const userGlobalAtom = atom<{ name: string, photoUrl?: string }>({
    key: "user",
    default: {
        name: "",
        photoUrl: undefined
    }
})
