import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Navigation from '../components/Navigation/Navigation';

const StyledWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const MainTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Navigation />
    <StyledWrapper>{children}</StyledWrapper>
  </ThemeProvider>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
