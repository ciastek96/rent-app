import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes/routes';

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
  font-weight: 600;
  transition: color 0.25s linear;

  &.active {
    color: ${({ theme }) => theme.green};
  }

  &:hover {
    color: ${({ theme }) => theme.green};
  }
`;

const Menu = () => (
  <List>
    <ListItem as={NavLink} exact to="/" activeClassName="active">
      Dashboard
    </ListItem>
    <ListItem as={NavLink} to={routes.rents} activeClassName="active">
      Wypożyczalnia
    </ListItem>
    <ListItem as={NavLink} to={routes.products} activeClassName="active">
      Produkty
    </ListItem>
    <ListItem as={NavLink} to={routes.clients} activeClassName="active">
      Klienci
    </ListItem>
    <ListItem as={NavLink} to={routes.finances} activeClassName="active">
      Finanse
    </ListItem>
  </List>
);

export default Menu;
