import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import DownIcon from '../../assets/icons/svg/directional/angle-down.svg';
import BellIcon from '../../assets/icons/svg/interfaces/bell-alt.svg';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const UserPanel = () => (
  <StyledWrapper>
    <StyledNotificationButton />
    <StyledUserButton>
      <StyledAvatar />
      <p>Kamil Kołacz</p>
    </StyledUserButton>
  </StyledWrapper>
);

export default UserPanel;
