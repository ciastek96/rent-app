import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Navbar from '../components/organisms/Navbar/Navbar';
import Loader from '../components/organisms/Loader/Loader';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import Loading from '../providers/Loading';
import Notification from '../providers/Notification';

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
          <Notification
            render={({ toastNotification, isNotificationVisible, setIsNotificationVisible }) => (
              <>
                {isNotificationVisible && (
                  <MessageBox type={toastNotification.type} value={toastNotification.content} setIsOpen={setIsNotificationVisible} />
                )}
              </>
            )}
          />
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
