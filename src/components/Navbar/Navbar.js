import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Menu from '../Menu/Menu';
import UserPanel from '../UserPanel/UserPanel';
import Sidebar from '../Sidebar/Sidebar';
import { ReactComponent as Logotype } from '../../assets/logo.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/svg/interfaces/nav-icon.svg';

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

const StyledHamburger = styled(Hamburger)`
  width: 20px;
  height: 18px;
  cursor: pointer;
  fill: ${({ theme }) => theme.gray};
  transition: fill 0.25s ease-in-out;
  z-index: 999;

  .active,
  &:focus,
  &:hover {
    fill: ${({ theme }) => theme.darkGray};
  }
`;

const Navbar = () => {
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleResize = () => {
    const { innerWidth } = window;
    if (innerWidth < 800) setIsHamburgerVisible(true);
    else setIsHamburgerVisible(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  return (
    <>
      <Wrapper>
        <Logo as={NavLink} to="/">
          <StyledLogotype />
        </Logo>

        {isHamburgerVisible ? (
          <StyledHamburger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        ) : (
          <>
            <Menu />
            <UserPanel />
          </>
        )}
      </Wrapper>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Navbar;
