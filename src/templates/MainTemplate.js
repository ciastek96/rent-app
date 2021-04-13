import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Navbar from '../components/organisms/Navbar/Navbar';
import Loader from '../components/organisms/Loader/Loader';
import Spinner from '../components/atoms/Spinner/Spinner';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import Loading from '../providers/Loading';

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto 45px;
  padding: 15px;
`;

const MainTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Navbar />
    <Loading
      render={({ isLoading }) => (
        <>
          {isLoading && <Loader />}
          {/* {client.error && isMessageBoxOpen && <MessageBox type="error" value="Wystąpił błąd. Spróbuj ponownie." setIsOpen={setIsMessageBoxOpen} />}
          {client.success && isMessageBoxOpen && (
            <MessageBox type="success" value="Dane zostały zapisane pomyślnie." setIsOpen={setIsMessageBoxOpen} />
          )} */}
          <Wrapper>{children}</Wrapper>
        </>
      )}
    />
  </ThemeProvider>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

MainTemplate.defaultProps = {
  children: null,
};

export default MainTemplate;
