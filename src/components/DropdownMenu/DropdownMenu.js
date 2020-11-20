import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';

const StyledWrapper = styled.div`
  position: absolute;
  top: 150%;
  right: 0;
  color: red;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 999;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;

const DropdownMenu = ({ children }) => (
  <StyledWrapper>
    <StyledList>
      {/* <StyledListItem>
          <StyledLink to={routes.settings}>Ustawienia konta</StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to={routes.logout}>Wyloguj</StyledLink>
        </StyledListItem> */}
      {children}
    </StyledList>
  </StyledWrapper>
);

DropdownMenu.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DropdownMenu;
