import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { getClients, getProducts } from '../actions';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Navbar from '../components/Navbar/Navbar';

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const MainTemplate = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProducts());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default MainTemplate;
