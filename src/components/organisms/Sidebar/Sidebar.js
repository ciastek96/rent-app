import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Menu from '../../molecules/Menu/Menu';
import UserPanel from '../../molecules/UserPanel/UserPanel';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 45px 0 120px 0;
  z-index: 995;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? 0 : '-100%')};
  transition: right 0.25s ease-in-out;
`;

const Sidebar = ({ isOpen }) =>
  ReactDOM.createPortal(
    <Wrapper isOpen={isOpen}>
      <Menu isSidebar="true" />
      <UserPanel />
    </Wrapper>,
    document.getElementById('portal'),
  );

export default Sidebar;
