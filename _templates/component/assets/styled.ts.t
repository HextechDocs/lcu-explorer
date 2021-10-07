---
to: renderer/components/<%= h.capitalize(name) %>/assets/Styled.ts
---
import styled from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme('mode', {
  light: '#ddd',
  dark: '#222',
});

const Styled = styled.div`
  background-color: ${backgroundColor};
`;

export default Styled
