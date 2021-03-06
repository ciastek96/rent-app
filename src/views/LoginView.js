import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LoginTemplate from '../templates/LoginTemplate';
import { routes } from '../routes/routes';
import { ReactComponent as Logotype } from '../assets/logo.svg';
import LoginForm from '../components/organisms/LoginForm/LoginForm';
import RegisterForm from '../components/organisms/RegisterForm/RegisterForm';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(21, 184, 113);
  background: linear-gradient(247deg, rgba(21, 184, 113, 1) 0%, rgba(13, 111, 68, 1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const Card = styled.div`
  height: 600px;
  max-width: 440px;
  background: ${({ theme }) => theme.default};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 65px;

  @media (max-width: 400px) {
    padding: 65px 25px;
  }
`;

const Logo = styled.a`
  font-size: 24px;
  color: ${({ theme }) => theme.green};
  text-decoration: none;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.gray};
  text-align: center;
`;

const StyledLogotype = styled(Logotype)`
  max-width: 80px;
`;

const LoginView = ({ location: { pathname } }) => {
  const isAuth = useSelector((state) => state.users.isAuthenticated);
  const [cardType, setCardType] = useState(pathname);
  const [redirect, setRedirect] = useState(false);

  if (isAuth && redirect) {
    return <Redirect to={{ pathname: routes.home, state: { from: routes.login } }} />;
  }

  return (
    <LoginTemplate>
      <Wrapper>
        <Card>
          <Logo>
            <StyledLogotype />
          </Logo>
          {cardType === routes.register ? (
            <>
              <Paragraph>Stwórz bezpłatne konto i korzystaj z platformy do zarządzania twoją wypożyczalnią!</Paragraph>
              <RegisterForm setCardType={setCardType} />
            </>
          ) : (
            <>
              <Paragraph>
                {cardType === routes.logout && 'Zostałeś pomyślnie wylogowany. '}
                Zaloguj się, aby uzyskać dostęp do twojej wypożyczalni.
              </Paragraph>
              <LoginForm setCardType={setCardType} setRedirect={setRedirect} />
            </>
          )}
        </Card>
      </Wrapper>
    </LoginTemplate>
  );
};

LoginView.propTypes = {
  location: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
};

LoginView.defaultProps = {
  location: null,
};

export default LoginView;
