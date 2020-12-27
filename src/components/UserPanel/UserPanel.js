import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routes } from '../../routes/routes';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DownIcon from '../../assets/icons/svg/directional/angle-down.svg';
// import { ReactComponent as BellIcon } from '../../assets/icons/svg/interfaces/bell-alt.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// const NotificationButton = styled.button`
//   height: 35px;
//   width: 35px;
//   border: 0;
//   margin: 0 10px;
//   padding: 8px;
//   background: none;
// `;

// const StyledBellIcon = styled(BellIcon)`
//   fill: ${({ theme }) => theme.gray};
//   cursor: pointer;
//   transition: fill 0.25s ease-in-out;

//   &:hover {
//     fill: ${({ theme }) => theme.darkGray};
//   }
// `;

const UserButton = styled.button`
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

const Avatar = styled.div`
  min-width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ theme, photo }) => (photo ? theme.default : theme.green)};
  background-image: ${({ photo }) => `url(${photo})`};
  background-size: cover;
  background-position: center;
  margin-right: 15px;
`;

const ListItem = styled.li`
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

const UserPanel = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const username = useSelector((state) => state.users.user.username);
  const account = useSelector((state) => state.account.find((ac) => ac.userID === state.users.user.userID));

  return (
    <Wrapper>
      {/* <NotificationButton>
        <StyledBellIcon />
      </NotificationButton> */}
      <UserButton onClick={() => setToggleMenu(!toggleMenu)}>
        <Avatar photo={account ? account.selectedFile : null} />
        <p>{username}</p>
      </UserButton>
      <DropdownMenu top="150%" isOpen={toggleMenu}>
        <ListItem>
          <StyledLink to={routes.settings}>Ustawienia konta</StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to={routes.logout}>Wyloguj</StyledLink>
        </ListItem>
      </DropdownMenu>
    </Wrapper>
  );
};

export default UserPanel;
