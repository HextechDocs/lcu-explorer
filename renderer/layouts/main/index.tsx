import React from "react";

import { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";

import Header from "@components/Titlebar";
import ThemeAtom from "@state/Theme";

import Styled from "./assets/styled";

interface MainLayoutProps {
  children: never;
}

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  const [theme, setTheme] = useRecoilState(ThemeAtom);

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <Styled>
        <Header />
        {children}
      </Styled>
    </ThemeProvider>
  );
};

export default MainLayout;
