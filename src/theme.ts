import { useRecoilValue } from "recoil";
import { DefaultTheme } from "styled-components";
import { darkMode } from "./atom";

export const theme: DefaultTheme = {
    bgColor: "#2f3640",
    textColor: "#f5f6fa",
    accentColor: "#44bd32",
    cardColor: "white"
}

export const darkTheme: DefaultTheme = {
    bgColor: "#f5f6fa",
    textColor: "#2f3640",
    accentColor: "#44bd32",
    cardColor: "#2f3640"
}