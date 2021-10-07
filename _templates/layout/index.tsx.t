---
    to: renderer/layouts/<%= h.capitalize(name) %>/index.tsx
---
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import Styled from './assets/Styled'

import Header from '@Components/Header';
import ThemeAtom from '@State/Theme';

import Props from '@Interfaces/layouts/<%= h.capitalize(name) %>/props'

const <%= h.capitalize(name) %> = ({}: Props): JSX.Element => {
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

export default <%= h.capitalize(name) %>
