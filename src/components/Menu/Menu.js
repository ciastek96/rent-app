import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ListItem = styled.li`
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
  <List>
    <ListItem as={NavLink} exact to="/" activeClassName="active">
      Dashboard
    </ListItem>
    <ListItem as={NavLink} to="/wypozyczalnia" activeClassName="active">
      Wypożyczalnia
    </ListItem>
    <ListItem as={NavLink} to="/produkty" activeClassName="active">
      Produkty
    </ListItem>
    <ListItem as={NavLink} to="/klienci" activeClassName="active">
      Klienci
    </ListItem>
    <ListItem as={NavLink} to="/finanse" activeClassName="active">
      Finanse
    </ListItem>
  </List>
);

export default Menu;
