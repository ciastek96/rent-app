import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';

const StyledWrapper = styled.div`
  position: absolute;
  top: 150%;
  right: 0;
  color: red;
  width: 100%;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 999;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.gray};
  margin: 0;
  padding: 25px;

  &:hover {
    background-color: ${({ theme }) => theme.default};
  }
`;

const DropdownMenu = () => {
  let i;
  return (
    <StyledWrapper>
      <StyledList>
        <StyledListItem>
          <StyledLink to={routes.settings}>Ustawienia konta</StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to={routes.logout}>Wyloguj</StyledLink>
        </StyledListItem>
      </StyledList>
    </StyledWrapper>
  );
};

export default DropdownMenu;
