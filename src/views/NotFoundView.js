import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';

const StyledWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgb(21, 184, 113);
  background: linear-gradient(247deg, rgba(21, 184, 113, 1) 0%, rgba(13, 111, 68, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInnerWrapper = styled.div`
  height: 200px;
`;

const StyledHeading = styled.h1`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.default};
  text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
`;

const StyledParagraph = styled.p`
  margin-top: 10px;
  padding: 0;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
`;

const NotFoundView = () => (
  <MainTemplate>
    <StyledWrapper>
      <StyledInnerWrapper>
        <StyledHeading>Oops... Nic tu nie ma!</StyledHeading>
        <StyledParagraph>Strona, której szukasz nie istnieje.</StyledParagraph>
      </StyledInnerWrapper>
    </StyledWrapper>
  </MainTemplate>
);

export default NotFoundView;
