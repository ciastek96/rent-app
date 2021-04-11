import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Navbar from '../components/organisms/Navbar/Navbar';

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto 45px;
  padding: 15px;
`;

const MainTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Navbar />
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

MainTemplate.defaultProps = {
  children: null,
};

export default MainTemplate;
