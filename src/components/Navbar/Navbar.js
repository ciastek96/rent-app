import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Menu from '../Menu/Menu';
import UserPanel from '../UserPanel/UserPanel';
import { ReactComponent as Logotype } from '../../assets/logo.svg';

const Wrapper = styled.div`
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

const Logo = styled.a`
  font-size: 24px;
  color: ${({ theme }) => theme.green};
  background: url(${Logotype});
  text-decoration: none;
`;

const StyledLogotype = styled(Logotype)`
  max-width: 80px;
`;

const Navbar = () => (
  <Wrapper>
    <Logo as={NavLink} to="/">
      <StyledLogotype />
    </Logo>
    <Menu />
    <UserPanel />
  </Wrapper>
);

export default Navbar;
