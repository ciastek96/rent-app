import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes/routes';

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

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${({ isSidebar }) =>
    isSidebar &&
    css`
      text-align: center;
      flex-direction: column;

      ${ListItem} {
        padding: 16px;
      }
    `}
`;

const Menu = ({ isSidebar }) => (
  <List isSidebar={isSidebar}>
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
      Historia
    </ListItem>
  </List>
);

export default Menu;
