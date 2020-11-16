import React from 'react';
import styled from 'styled-components';
import Menu from '../Menu/Menu';
import UserPanel from '../UserPanel/UserPanel';

const StyledWrapper = styled.div`
  height: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoWrapper = styled.a``;

const Navigator = () => (
  <StyledWrapper>
    <StyledLogoWrapper href="#">1</StyledLogoWrapper>
    <Menu />
    <UserPanel>3</UserPanel>
  </StyledWrapper>
);

export default Navigator;
