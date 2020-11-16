import React from 'react';
import styled from 'styled-components';
import LoginTemplate from '../templates/LoginTemplate';

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
  background: ${({ theme }) => theme.default};
  border-radius: 25px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginView = () => (
  <LoginTemplate>
    <StyledWrapper>
      <StyledCard>fastrent</StyledCard>
    </StyledWrapper>
  </LoginTemplate>
);

export default LoginView;
