import { atom } from "recoil";

// export interface ThemeBoolean {
//     isDarkMode : boolean;
// }

export const darkMode = atom({
    key: "dark",
    default: false
})