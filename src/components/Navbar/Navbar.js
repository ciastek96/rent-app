import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
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
  padding: 20px;
`;

const StyledLogo = styled.a`
  font-size: 24px;
  color: ${({ theme }) => theme.green};
  text-decoration: none;
`;

const Navbar = () => (
  <StyledWrapper>
    <StyledLogo as={NavLink} to="/">
      fastrent
    </StyledLogo>
    <Menu />
    <UserPanel>3</UserPanel>
  </StyledWrapper>
);

export default Navbar;
