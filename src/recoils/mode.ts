import { atom } from "recoil";
import { PaletteMode } from "@mui/material";

export const styleModeState = atom<PaletteMode>({
  key: "styleMode",
  default: "light",
  //   default: {} //key 값에 접근하기 위해 Map 사용,
});
