import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledListItem = styled.li`
  padding: 0 12px;
  color: black;
  text-decoration: none;
  list-style: none;
  color: ${({ theme }) => theme.gray};
  font-weight: 500;

  &.active {
    color: ${({ theme }) => theme.green};
  }
`;

const Menu = () => (
  <StyledList>
    <StyledListItem as={NavLink} exact to="/" activeClassName="active">
      Dashboard
    </StyledListItem>
    <StyledListItem as={NavLink} to="/wypozyczalnia" activeClassName="active">
      Wypożyczalnia
    </StyledListItem>
    <StyledListItem as={NavLink} to="/produkty" activeClassName="active">
      Produkty
    </StyledListItem>
    <StyledListItem as={NavLink} to="/klienci" activeClassName="active">
      Klienci
    </StyledListItem>
    <StyledListItem as={NavLink} to="/finanse" activeClassName="active">
      Finanse
    </StyledListItem>
  </StyledList>
);

export default Menu;
