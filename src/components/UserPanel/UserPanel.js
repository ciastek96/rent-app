import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DownIcon from '../../assets/icons/svg/directional/angle-down.svg';
import BellIcon from '../../assets/icons/svg/interfaces/bell-alt.svg';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledNotificationButton = styled.button`
  height: 35px;
  width: 35px;
  border: 0;
  background: url(${BellIcon});
  opacity: 0.3;
  background-size: 40%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

const StyledUserButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  background: url(${DownIcon});
  background-size: 6%;
  background-position: 95% 55%;
  background-repeat: no-repeat;
  padding-right: 30px;
`;

const StyledAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green};
  margin-right: 15px;
`;

const StyledListItem = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.gray};
  margin: 0;
  padding: 20px 25px;

  &:hover {
    background-color: ${({ theme }) => theme.default};
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  top: 150%;
`;

const UserPanel = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <StyledWrapper>
      <StyledNotificationButton />
      <StyledUserButton onClick={() => setToggleMenu(!toggleMenu)}>
        <StyledAvatar />
        <p>Kamil Kołacz</p>
      </StyledUserButton>
      {toggleMenu && (
        <>
          <StyledDropdownMenu top="150%">
            <StyledListItem>
              <StyledLink to={routes.settings}>Ustawienia konta</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to={routes.logout}>Wyloguj</StyledLink>
            </StyledListItem>
          </StyledDropdownMenu>
        </>
      )}
    </StyledWrapper>
  );
};

export default UserPanel;
