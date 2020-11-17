import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import LoginTemplate from '../templates/LoginTemplate';
import { routes } from '../routes/routes';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(21, 184, 113);
  background: linear-gradient(247deg, rgba(21, 184, 113, 1) 0%, rgba(13, 111, 68, 1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled.div`
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

const StyledInnerWrapper = styled.div`
  width: 100%;
`;

const StyledLogo = styled.a`
  font-size: 24px;
  color: ${({ theme }) => theme.green};
  text-decoration: none;
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.gray};
  text-align: center;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 5px 0;

  &:last-of-type {
    margin-bottom: 45px;
  }
`;

const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
      <StyledWrapper>
        <StyledCard>
          <StyledLogo>EasyRent.</StyledLogo>
          {cardType === routes.register ? (
            <>
              <StyledParagraph>
                Stwórz bezpłatne konto i korzystaj z platformy do zarządzania twoją wypożyczalnią!
              </StyledParagraph>
              <StyledInnerWrapper>
                <StyledForm>
                  <StyledInput type="text" name="username" placeholder="Nazwa użytkownika" />
                  <StyledInput type="text" name="email" placeholder="Adres e-mail" />
                  <StyledInput type="password" name="password" placeholder="Hasło" />
                  <StyledInput type="password" name="password2" placeholder="Powtórz hasło" />
                </StyledForm>
                <StyledButtonsWrapper>
                  <Button secondary onClick={() => setCardType(routes.login)}>
                    Logowanie
                  </Button>
                  <Button>Stwórz konto</Button>
                </StyledButtonsWrapper>
              </StyledInnerWrapper>
            </>
          ) : (
            <>
              <StyledParagraph>
                {cardType === routes.logout && 'Zostałeś pomyślnie wylogowany. '}
                Zaloguj się, aby uzyskać dostęp do twojej wypożyczalni.
              </StyledParagraph>
              <StyledInnerWrapper>
                <StyledForm>
                  <StyledInput type="text" name="username" placeholder="Nazwa użytkownika" />
                  <StyledInput type="password" name="password" placeholder="Hasło" />
                </StyledForm>
                <StyledButtonsWrapper>
                  <Button secondary onClick={() => setCardType(routes.register)}>
                    Rejestracja
                  </Button>
                  <Button>Zaloguj</Button>
                </StyledButtonsWrapper>
              </StyledInnerWrapper>
            </>
          )}
        </StyledCard>
      </StyledWrapper>
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
