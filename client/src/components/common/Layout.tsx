import React, { ReactNode } from "react";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import Header from "./Header";
import { useRecoilValue } from "recoil";
import { styleModeState } from "../../recoils/mode";

const Layout = ({ children }: { children: ReactNode }) => {
  const mode = useRecoilValue(styleModeState);

  //전체 스타일 셋팅
  const theme = React.useMemo(
    () =>
      createTheme({
        transitions: {},
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // 글로벌 styles
  const globalStyles = {
    body: {
      transition: "all 0.2s",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Header />
        {children}
      </ThemeProvider>
    </>
  );
};
export default Layout;
