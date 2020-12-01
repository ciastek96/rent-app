import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';

const Wrapper = styled.div`
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

const InnerWrapper = styled.div`
  height: 200px;
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.default};
  text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
`;

const Paragraph = styled.p`
  margin-top: 10px;
  padding: 0;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
`;

const NotFoundView = () => (
  <MainTemplate>
    <Wrapper>
      <InnerWrapper>
        <Heading>Oops... Nic tu nie ma!</Heading>
        <Paragraph>Strona, której szukasz nie istnieje.</Paragraph>
      </InnerWrapper>
    </Wrapper>
  </MainTemplate>
);

export default NotFoundView;
