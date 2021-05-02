import React from 'react';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import GlobalStyle from '../theme/globalStyles';
import Loader from '../components/organisms/Loader/Loader';
import Loading from '../providers/Loading';
import MessageBox from '../components/atoms/MessageBox/MessageBox';
import Notification from '../providers/Notification';

const LoginTemplate = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
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
          {children}
        </>
      )}
    />
  </ThemeProvider>
);

LoginTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LoginTemplate;
