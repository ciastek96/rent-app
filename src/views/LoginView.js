import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import LoginTemplate from '../templates/LoginTemplate';
import { routes } from '../routes/routes';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(21, 184, 113);
  background: linear-gradient(247deg, rgba(21, 184, 113, 1) 0%, rgba(13, 111, 68, 1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  height: 620px;
  width: 480px;
  padding: 65px;
  background: ${({ theme }) => theme.default};
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const InnerWrapper = styled.div`
  width: 100%;
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

const LoginView = ({ location: { pathname } }) => {
  const [cardType, setCardType] = useState('/logowanie');

  useEffect(() => {
    if (pathname === routes.register) {
      setCardType(routes.register);
    } else if (pathname === routes.logout) {
      setCardType(routes.logout);
    }
  }, []);

  return (
    <LoginTemplate>
      <Wrapper>
        <Card>
          <Logo>EasyRent.</Logo>
          {cardType === routes.register ? (
            <>
              <Paragraph>
                Stwórz bezpłatne konto i korzystaj z platformy do zarządzania twoją wypożyczalnią!
              </Paragraph>
              <RegisterForm setCardType={setCardType} />
            </>
          ) : (
            <>
              <Paragraph>
                {cardType === routes.logout && 'Zostałeś pomyślnie wylogowany. '}
                Zaloguj się, aby uzyskać dostęp do twojej wypożyczalni.
              </Paragraph>
              <LoginForm setCardType={setCardType} />
            </>
          )}
        </Card>
      </Wrapper>
    </LoginTemplate>
  );
};

LoginView.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
};

LoginView.defaultProps = {
  location: null,
};

export default LoginView;
