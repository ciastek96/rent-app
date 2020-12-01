import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Navbar from '../components/Navbar/Navbar';

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const MainTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Navbar />
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);

MainTemplate.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default MainTemplate;
